import { Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { UnitProfilePicture } from "../../../../components/common/images/UnitProfilePicture.tsx";
import { useScreenSize } from "../../../../hooks/useScreenSize.ts";
import { Trackable } from "../../../../state/gamemode/gamestate";

type HeroStatTrackerProps = {
  tracker: Trackable;
  updateMwfw?: (
    newValue: number,
    trackerIndex: number,
    statIndex: number,
  ) => void;
  index: number;
};
export const HeroStatTracker: FunctionComponent<HeroStatTrackerProps> = ({
  tracker,
}) => {
  const screen = useScreenSize();

  return (
    <Paper
      sx={[
        { p: 1 },
      ]}
    >
      <Stack direction={screen.isMobile ? "column" : "row"}>
        <Stack alignItems="center" sx={{ position: "relative" }}>
          <UnitProfilePicture
            army={tracker.profile_origin}
            profile={tracker.name}
          />
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              color: "white",
              opacity: 0.7,
            }}
          >
          </Box>
        </Stack>
        <Stack flexGrow={1}>
          <Typography
            variant="h6"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "100%",
              textOverflow: "ellipsis",
              textAlign: screen.isMobile ? "center" : "start",
              mb: screen.isMobile ? 2 : 0,
              px: 2,
            }}
          >
            {tracker.name}
          </Typography>
          <Stack
            direction={screen.isMobile ? "column" : "row"}
            gap={screen.isMobile ? 1 : 0}
            sx={{
              ml: screen.isMobile ? 2 : 0,
            }}
            justifyContent="space-around"
          >
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
