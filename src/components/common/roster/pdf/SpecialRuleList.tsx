import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import keywords from "../../../../assets/data/keywords.json";

import { armyListData } from "../../../../assets/data.ts";
import { Profile } from "../../../../hooks/profile-utils/profile.type.ts";
import { useRosterInformation } from "../../../../hooks/useRosterInformation.ts";
import { useUserPreferences } from "../../../../state/preference";

interface SpecialRuleListProps {
  profiles: Profile[];
}

type SpecialRule = {
  name: string;
  description: string;
  type: string;
};

function duplicates(item: SpecialRule, index: number, self: SpecialRule[]) {
  return index === self.findIndex((other) => other.name === item.name);
}

function mapSpecialRule(sr: string) {
    const rule = keywords.find(
    (keyword) => keyword.name === sr.replace(/\(.*?\)/g, "(X)"),
  );
  return {
    name: rule?.name || sr,
    type: rule?.type,
    description: rule?.description,
  };
}

export const SpecialRuleList = ({ profiles }: SpecialRuleListProps) => {
  const {
    preferences: { removePdfPageBreak, hidePdfSpecialRules },
  } = useUserPreferences();
  const {
    roster: { armyList },
  } = useRosterInformation();
  const armyListRules = armyListData[armyList];

  const specialRules: SpecialRule[] = profiles
    .flatMap((profile) => [
      ...profile.special_rules.map(mapSpecialRule),
      ...(profile.additional_stats?.flatMap((additionalProfile) => [
        ...additionalProfile.special_rules.map(mapSpecialRule),
      ]) || []),
    ])
    .concat(armyListRules.rule_highlights?.map(mapSpecialRule))
    .filter(duplicates)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Box id="pdf-rules" className={removePdfPageBreak ? "" : "page-break"}>
        {!hidePdfSpecialRules && (
          <Box>
            <Typography variant="h5">Special rules</Typography>
            <Stack gap={1} sx={{ py: 1 }}>
              {specialRules.map((rule) => (
                <Box key={rule.name} sx={{ py: 0.8, pageBreakInside: "avoid" }}>
                  <Typography variant="body1">
                    <b>
                      {rule.name} {rule.type && <>({rule.type})</>}
                    </b>
                  </Typography>
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: rule.description?.replaceAll("\n\n", "<br />"),
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};
