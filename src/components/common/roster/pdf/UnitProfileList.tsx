import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { keywords } from "../../../../assets/data.ts";
import { Profile } from "../../../../hooks/profile-utils/profile.type.ts";
import { useUserPreferences } from "../../../../state/preference";

interface UnitListProps {
  units: Profile[];
}

const Stats = ({ profile }: { profile: Profile }) => {
  const skippedParentRow = [
    "Vault Warden Team",
    "Uruk-Hai Demolition Team",
    "Bard's Family",
  ].includes(profile.name);
  return (
    <TableContainer component="div" sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {profile.additional_stats && <TableCell />}
            <TableCell>M</TableCell>
            <TableCell>WS</TableCell>
            <TableCell>BS</TableCell>
            <TableCell>S</TableCell>
            <TableCell>T</TableCell>
            <TableCell>W</TableCell>
            <TableCell>I</TableCell>
            <TableCell>A</TableCell>
            <TableCell>LD</TableCell>
            <TableCell>CL</TableCell>
            <TableCell>WP</TableCell>
            <TableCell>IN</TableCell>
            <TableCell>SAV</TableCell>
            <TableCell>INV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!skippedParentRow && (
            <TableRow>
              {profile.additional_stats && (
                <TableCell>{profile.name}</TableCell>
              )}
              <TableCell>{profile.M}</TableCell>
              <TableCell>{profile.WS}</TableCell>
              <TableCell>{profile.BS}</TableCell>
              <TableCell>{profile.S}</TableCell>
              <TableCell>{profile.T}</TableCell>
              <TableCell>{profile.W}</TableCell>
              <TableCell>{profile.I}</TableCell>
              <TableCell>{profile.A}</TableCell>
              <TableCell>{profile.LD}</TableCell>
              <TableCell>{profile.CL}</TableCell>
              <TableCell>{profile.WP}</TableCell>
              <TableCell>{profile.IN}</TableCell>
              <TableCell>{profile.SAV}</TableCell>
              <TableCell>{profile.INV}</TableCell>
            </TableRow>
          )}
          {profile.additional_stats?.map((stats, index) => (
            <TableRow key={index}>
              <TableCell>{stats.name}</TableCell>
              <TableCell>{stats.M}</TableCell>
              <TableCell>{stats.WS}</TableCell>
              <TableCell>{stats.BS}</TableCell>
              <TableCell>{stats.S}</TableCell>
              <TableCell>{stats.T}</TableCell>
              <TableCell>{stats.W}</TableCell>
              <TableCell>{stats.I}</TableCell>
              <TableCell>{stats.A}</TableCell>
              <TableCell>{stats.LD}</TableCell>
              <TableCell>{stats.CL}</TableCell>
              <TableCell>{stats.WP}</TableCell>
              <TableCell>{stats.IN}</TableCell>
              <TableCell>{stats.SAV}</TableCell>
              <TableCell>{stats.INV}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AdditionalText = ({ profile }: { profile: Profile }) => {
  return (
    <>
      {profile.additional_text && (
        <Typography sx={{ mb: 0.5 }} variant="body2">
          {profile.additional_text.map((text, index) => (
            <Typography sx={{ my: 0.5 }} key={index}>
              <i>{text}</i>
            </Typography>
          ))}
        </Typography>
      )}
    </>
  );
};

const SpecialRules = ({ profile }: { profile: Profile }) => {
  const {
    preferences: { includePdfSpecialRuleDescriptions },
  } = useUserPreferences();
  const specialRules: { name: string; description: string }[] = [
    ...profile.special_rules.map((rule) => ({
      ...keywords.find((kw) =>
        rule.endsWith("bane")
          ? kw.name === "Bane Weapons"
          : kw.name === rule.replace(/\(.*?\)/g, "(X)"),
      ),
      name: rule,
    })),
  ].sort((a, b) => a.name.localeCompare(b.name));

  if (includePdfSpecialRuleDescriptions) {
    return (
      <>
        <Typography sx={{ mt: 0.5 }}>
          <b>Special Rules</b> {specialRules.length === 0 && <i>None</i>}
        </Typography>
        {specialRules.map((rule, index) => (
          <Box key={index} sx={{ my: 1, ml: 2 }}>
            <Typography>
              <b>{rule.name}</b>
              <br />
              {rule.description}
            </Typography>
          </Box>
        ))}
      </>
    );
  }

  return (
    <Typography sx={{ mt: 0.5 }}>
      <b>Special Rules:</b> {specialRules.map((rule) => rule.name).join(", ")}{" "}
      {specialRules.length === 0 && <i>None</i>}
    </Typography>
  );
};


const AdditionalProfiles = ({
  additionalProfiles,
}: {
  additionalProfiles: Profile[];
}) => {
  return (
    <Box sx={{ pl: 2, mt: 2 }}>
      {additionalProfiles.map((profile, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          <Typography>
            <b>{profile.name}</b>
          </Typography>
          <Box sx={{ pl: 2 }}>
            <AdditionalText profile={profile} />
            <SpecialRules profile={profile} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const ListItem = ({ profile }: { profile: Profile }) => {
  return (
    <>
      <Box sx={{ py: 2, pageBreakInside: "avoid" }}>
        <Typography variant="h6">
          <b>{profile.name}</b>
        </Typography>
        <AdditionalText profile={profile} />
        <Stats profile={profile} />
        <SpecialRules profile={profile} />
        <AdditionalProfiles
          additionalProfiles={profile?.additional_stats || []}
        />
      </Box>
    </>
  );
};

export const UnitProfileList = ({ units }: UnitListProps) => {
  const {
    preferences: { removePdfPageBreak },
  } = useUserPreferences();
  return (
    <Box id="pdf-profiles" className={removePdfPageBreak ? "" : "page-break"}>
      <Typography variant="h5">Profiles</Typography>
      {units
        .filter((unit) => unit.type !== "Siege Equipment")
        .map((unit, index) => (
          <Fragment key={index}>
            <ListItem profile={unit} />
            {units.length !== index && <Divider variant="fullWidth" />}
          </Fragment>
        ))}
    </Box>
  );
};
