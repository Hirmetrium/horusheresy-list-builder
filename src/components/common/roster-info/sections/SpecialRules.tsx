import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import armyListData from "../../../../assets/data/army_list_data.json";
import { ArmyListData } from "../../../../types/army-list-data.types.ts";
import { RosterInformationProps } from "../RosterInformation.tsx";
import { RosterInformationSection } from "../RosterInformationSection.tsx";

export const SpecialRules: FunctionComponent<
  Pick<RosterInformationProps, "roster" | "editable"> & {
    size?: "dense" | "normal";
  }
> = ({ roster, size = "normal" }) => {
  const armyListMetadata = (armyListData as ArmyListData)[roster.armyList];

  if (!armyListMetadata || armyListMetadata.special_rules.length === 0)
    return <></>;



    return (
        <RosterInformationSection title="Special rules">
            <Box component="ul" sx={{ listStyle: "none", pl: 2 }}>
                {armyListMetadata.special_rules
                    .map((rule, index) => (
                        <Box
                            component="li"
                            key={index}
                            sx={{ py: size === "normal" ? 1 : 0 }}
                        >
                            )
                            <Stack gap={1}>
                                {rule.description.split("\n").map((line, index) => (
                                    <Typography key={index}>{line}</Typography>
                                ))}
                            </Stack>
                        </Box>
                    ))}
            </Box>
        </RosterInformationSection>
    );

};
