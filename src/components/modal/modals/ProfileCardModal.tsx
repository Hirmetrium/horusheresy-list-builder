import { DialogContent } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Fragment } from "react";
import { heroConstraintData } from "../../../assets/data.ts";
import { useScreenSize } from "../../../hooks/useScreenSize.ts";
import { useAppState } from "../../../state/app";
import { Unit } from "../../../types/hh3-data.types.ts";
import { UnitProfileCard } from "../../common/images/UnitProfileCard.tsx";

export const ProfileCardModal = () => {
  const {
    modalContext: { unit },
  } = useAppState();
  const { palette } = useTheme();
  const { isMobile } = useScreenSize();

  const ExtraProfileCards = ({ unit }: { unit: Unit }) => {
    const data = heroConstraintData[unit.model_id];
    if (!data) return null;
    return data.extra_profiles?.map((profile) => (
      <Fragment key={profile}>
        <UnitProfileCard army={unit.profile_origin} profile={profile} />
      </Fragment>
    ));
  };

  return (
    <>
      <DialogContent>
        <Typography variant="body2">
          You can download a zip of all profile cards for your current army list
          by clicking on the floating action button in the bottom right, and
          selecting{" "}
          <Typography
            variant="body2"
            component="strong"
            fontWeight={800}
            color={palette.primary.main}
          >
            Download profile cards
          </Typography>
        </Typography>

        {unit != null && (
          <Box
            sx={{
              maxWidth: isMobile ? "100%" : "900px",
              m: "auto",
            }}
          >
            <UnitProfileCard army={unit.profile_origin} profile={unit.name} />
            <ExtraProfileCards unit={unit} />
          </Box>
        )}
      </DialogContent>
    </>
  );
};
