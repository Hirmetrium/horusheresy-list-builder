import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import { Grid2, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { armyListData } from "../../../../assets/data.ts";
import { useRosterInformation } from "../../../../hooks/useRosterInformation.ts";
import { useRosterWarnings } from "../../../../hooks/useRosterWarnings.ts";

interface HeaderBlockProps {
  includeRosterName: boolean;
}

export const HeaderBlock = ({ includeRosterName }: HeaderBlockProps) => {
  const { roster, getAdjustedMetaData } = useRosterInformation();
  const {
    units,
    points,
  } = getAdjustedMetaData();
  const warnings = useRosterWarnings();

  return (
    <>
      {includeRosterName && (
        <>
          <Typography
            variant="body1"
            textAlign="center"
            fontWeight="bold"
            color="#800000"
            sx={{
              textDecoration: "underline",
              "text-decoration-thickness": "0.5px",
              mb: 1,
            }}
          >
            {roster.name}
          </Typography>
        </>
      )}
      <Stack
        direction="row"
        gap={1}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h5"
          textAlign="center"
          textTransform="uppercase"
          fontWeight="bold"
          color="#800000"
        >
          {roster.armyList}
        </Typography>
        {warnings.length > 0 && (
          <ReportProblemRoundedIcon
            sx={{ color: (theme) => theme.palette.warning.main }}
          />
        )}
      </Stack>

      <Typography
        variant="h6"
        textAlign="center"
        textTransform="uppercase"
        fontWeight="bold"
      >
        {points} points | {units} units
      </Typography>
      <Grid2
        container
        columnSpacing={1}
        rowSpacing={3}
        alignItems="center"
        sx={{ my: 2 }}
      >
      </Grid2>
    </>
  );
};
