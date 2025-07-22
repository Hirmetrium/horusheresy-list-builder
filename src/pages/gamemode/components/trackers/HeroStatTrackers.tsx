import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useGameModeState } from "../../../../state/gamemode";
import { HeroStatTracker } from "./HeroStatTracker.tsx";

export const HeroStatTrackers = () => {
  const { rosterId } = useParams();
  const { gameState, } = useGameModeState();

  const trackers = gameState[rosterId]?.trackables || [];

  return (
    <>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          textAlign: "center",
        }}
      >
        Note: Heroes and War Beasts are automatically added as a casualty when
        their wounds reach 0.
      </Typography>
      {trackers.map((tracker, index) => (
        <HeroStatTracker
          tracker={tracker}
          index={index}
          key={index}
        />
      ))}
    </>
  );
};
