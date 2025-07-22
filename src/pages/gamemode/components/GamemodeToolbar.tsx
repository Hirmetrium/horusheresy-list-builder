import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, ButtonGroup, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { SquareIconButton } from "../../../components/common/icon-button/SquareIconButton.tsx";
import { ModalTypes } from "../../../components/modal/modals.tsx";
import { useRosterInformation } from "../../../hooks/useRosterInformation.ts";
import { useScreenSize } from "../../../hooks/useScreenSize.ts";
import { useAppState } from "../../../state/app";
import { useGameModeState } from "../../../state/gamemode";

export const GamemodeToolbar = () => {
  const navigate = useNavigate();
  const screen = useScreenSize();
  const { setCurrentModal, closeModal } = useAppState();
  const { gameState, updateGameState } = useGameModeState();
  const { roster } = useRosterInformation();

  const game = gameState[roster.id];

  const openEndGameDialog = () => {
    const gameStartTime = new Date(game.started);
    const gameEndTime = new Date();
    const gameDuration = gameEndTime.getTime() - gameStartTime.getTime();
    setCurrentModal(ModalTypes.END_GAME_DIALOG, {
      mode: "record",
      gameId: roster.id,
      formValues: {
        gameDate: gameStartTime.toISOString().slice(0, 10),
        duration: Math.ceil(gameDuration / 60000),
        points: Math.ceil(roster.metadata.points / 50) * 50, // rounds to the nearest full 50.
        result: "Draw",
        scenarioPlayed: null,
        tags: [],
        armies: roster.armyList,
        victoryPoints: "" as unknown as number,
        opponentArmies: "",
        opponentName: "",
        opponentVictoryPoints: "" as unknown as number,
      },
      onClose: (_, reason) => {
        if (reason !== "backdropClick") {
          closeModal();
        }
      },
    });
  };

  const updateCasualties = (update: 1 | -1) => {
    updateGameState(roster.id, {
      casualties: game.casualties + update,
    });
  };

  const casualties = game.casualties + game.heroCasualties;

  return screen.isMobile ? (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<ChevronLeft />}
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/gamemode/start", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
            }
          }}
        >
          Back
        </Button>
        <Button variant="outlined" onClick={() => openEndGameDialog()}>
          End game
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-around" sx={{ m: 2 }}>
      </Stack>
      <Stack direction="row" gap={2} justifyContent="center">
        <SquareIconButton
          onClick={() => updateCasualties(-1)}
          icon={<ChevronLeft />}
          iconColor="white"
          backgroundColor="darkgrey"
          iconPadding=".3rem"
          disabled={game.casualties === 0}
        />
        <Typography
          variant="h6"
          sx={{ mx: 1, fontSize: "1.4rem", fontWeight: "bolder" }}
        >
          {casualties}
        </Typography>
        <SquareIconButton
          onClick={() => updateCasualties(+1)}
          icon={<ChevronRight />}
          iconColor="white"
          backgroundColor="darkgrey"
          iconPadding=".3rem"
        />
      </Stack>
    </>
  ) : (
    <Toolbar
      sx={{
        backgroundColor: "rgba(211,211,211,0.5)",
        mb: 2,
        justifyContent: "space-between",
      }}
    >
      <Box>
        <ButtonGroup>
          <Button
            startIcon={<ChevronLeft />}
            onClick={() => {
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
              } else {
                navigate("/gamemode/start", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
              }
            }}
          >
            Back
          </Button>
          <Button onClick={() => openEndGameDialog()}>End game</Button>
        </ButtonGroup>
      </Box>
      <Stack direction="row" gap={2}>
        <Typography variant="h6" className="sabon">
          Casualties:
        </Typography>
        <SquareIconButton
          onClick={() => updateCasualties(-1)}
          icon={<ChevronLeft />}
          iconColor="white"
          backgroundColor="darkgrey"
          iconPadding=".3rem"
          disabled={game.casualties === 0}
        />
        <Typography
          variant="h6"
          sx={{ mx: 1, fontSize: "1.4rem", fontWeight: "bolder" }}
        >
          {casualties}
        </Typography>
        <SquareIconButton
          onClick={() => updateCasualties(+1)}
          icon={<ChevronRight />}
          iconColor="white"
          backgroundColor="darkgrey"
          iconPadding=".3rem"
        />
      </Stack>
    </Toolbar>
  );
};
