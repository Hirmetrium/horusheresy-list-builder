import { capitalize } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { FactionLogo } from "../../../components/common/images/FactionLogo.tsx";
import { Link } from "../../../components/common/link/Link.tsx";
import { useThemeContext } from "../../../theme/ThemeContext.tsx";
import { Roster } from "../../../types/roster.ts";
import { RosterPopoverMenu } from "./RosterPopoverMenu.tsx";

export type RosterSummaryCardProps = {
  roster: Roster;
};

const KeyValue = ({ label, value }) => {
  return (
    <Typography fontSize="1.2rem">
      {capitalize(label).replaceAll("_", " ")}{" "}
      <b style={{ float: "right" }}>{value}</b>
    </Typography>
  );
};

export const RosterSummaryCard: FunctionComponent<RosterSummaryCardProps> = ({
  roster,
}) => {
  const { mode } = useThemeContext();

  return (
    <Link
      to={`/roster/${roster.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
      data-test-id={"rosters--" + roster.id + "--link"}
    >
      <Card
        sx={{ width: "40ch", height: "350px", position: "relative" }}
        elevation={4}
      >
          <Stack sx={{ p: 2 }}>
            <center>
              <Typography
                variant="h6"
                className="sabon"
                sx={{
                  whiteSpace: "nowrap", // Prevent text from wrapping
                  overflow: "hidden", // Hide the overflowing text
                  textOverflow: "ellipsis", // Show ellipsis when text overflows
                  width: "300px", // Set a fixed width or max-width for overflow
                }}
              >
                {roster.name}
              </Typography>
              <FactionLogo faction={roster.armyList} size={62} />
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  color: ({ palette }) =>
                    mode === "dark" ? palette.grey.A400 : palette.grey.A700,
                }}
              >
                <i>{roster.armyList}</i>
              </Typography>
            </center>

            <Stack sx={{ my: 2 }}>
              <KeyValue label="Points" value={roster.metadata.points} />
              <KeyValue label="Units" value={roster.metadata.units} />
              <KeyValue label="Detachments" value={roster.warbands.length} />
            </Stack>
          </Stack>
          <Box
            sx={{
              position: "absolute",
              right: 2,
              top: 9,
            }}
          >
            <RosterPopoverMenu roster={roster} />
          </Box>
      </Card>
    </Link>
  );
};
