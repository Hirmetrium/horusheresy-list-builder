import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRosterInformation } from "../../../../hooks/useRosterInformation.ts";
import { createGameState } from "../../../../state/gamemode/gamestate/create-game-state.ts";
import { useThemeContext } from "../../../../theme/ThemeContext.tsx";

const CheckboxList = ({ amount }: { amount: string }) => {
  const { mode } = useThemeContext();
  return (
    <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center">
      {Array.from({ length: Number(amount) }).map((_, index) => (
        <div
          key={index}
          className="stat-tracker-box"
          style={{
            width: "20px",
            height: "20px",
            border: mode === "dark" ? "1px solid white" : "1px solid black",
            borderRadius: "20px",
          }}
        ></div>
      ))}
    </Stack>
  );
};

export const StatTrackers = () => {
  const { roster } = useRosterInformation();
  const { customTrackers } = createGameState(roster);

  const additionalWoundTrackers = customTrackers.map((extraTracker) => {
    return {
      name: extraTracker.name,
      wounds: extraTracker.value,
    };
  });

  const cellStyling: SxProps<Theme> = {
    border: 0,
    borderRight: 1,
    borderBottom: 1,
    borderColor: (theme) => theme.palette.grey["300"],
    borderStyle: "solid",
  };

  return (
    <Box id="pdf-stat-trackers" className="page-break">
      <Typography variant="h5">Might / Will / Fate trackers</Typography>
      <TableContainer component="div" sx={{ py: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" sx={cellStyling} />
              <TableCell size="small" align="center" sx={cellStyling}>
                Might
              </TableCell>
              <TableCell size="small" align="center" sx={cellStyling}>
                Will
              </TableCell>
              <TableCell size="small" align="center" sx={cellStyling}>
                Fate
              </TableCell>
              <TableCell size="small" align="center" sx={cellStyling}>
                Wounds
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {additionalWoundTrackers.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={cellStyling}>{row.name}</TableCell>
                <TableCell sx={cellStyling} />
                <TableCell sx={cellStyling} />
                <TableCell sx={cellStyling} />
                <TableCell sx={cellStyling}>
                  <CheckboxList amount={row.wounds.toString()} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
