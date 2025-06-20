import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import keywords from "../../../../assets/data/keywords.json";

import { Profile } from "../../../../hooks/profile-utils/profile.type.ts";
import { useUserPreferences } from "../../../../state/preference";

interface MagicalPowerListProps {
  profiles: Profile[];
}

type MagicalPower = {
  name: string;
  description: string;
};

function duplicates(item: MagicalPower, index: number, self: MagicalPower[]) {
  return index === self.findIndex((other) => other.name === item.name);
}

export const MagicalPowerList = ({ profiles }: MagicalPowerListProps) => {
  const {
    preferences: { removePdfPageBreak },
  } = useUserPreferences();

  const magicalPowers: MagicalPower[] = profiles
    .flatMap((profile) =>
      profile.magic_powers
        .map(({ name }) => name.replace(/\(.*?\)/g, "(X)"))
        .map((name) => {
          const power = keywords.find((keyword) => keyword.name === name);
          return {
            name,
            description: power?.description,
          };
        }),
    )
    .filter(duplicates)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {magicalPowers.length > 0 && (
        <Box id="pdf-magic" className={removePdfPageBreak ? "" : "page-break"}>
          <Typography variant="h5">Magical Powers</Typography>
          <Stack gap={1} sx={{ py: 1 }}>
            {magicalPowers.map((rule) => (
              <Box key={rule.name} sx={{ pageBreakInside: "avoid" }}>
                <Typography variant="h6">
                  <b>{rule.name}</b>
                </Typography>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: rule.description
                      ?.replaceAll("\n\n", "<br />")
                      ?.replaceAll(
                        "<b>",
                        "<h4 style='margin-top: 8px; display: inline-block'>",
                      )
                      ?.replaceAll("</b>:", ":</h4>"),
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
};
