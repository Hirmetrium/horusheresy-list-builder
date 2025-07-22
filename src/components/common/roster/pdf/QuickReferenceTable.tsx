import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { Profile } from "../../../../hooks/profile-utils/profile.type.ts";
import { useUserPreferences } from "../../../../state/preference";

interface QuickReferenceTableProps {
  profiles: Profile[];
  noCaption?: boolean;
}

const ReferenceRow = ({
  row,
  indent,
  prefix,
}: {
  row: Pick<
    Profile,
    | "name"
    | "M"
    | "WS"
    | "BS"
    | "S"
    | "T"
    | "W"
    | "I"
    | "A"
    | "LD"
    | "CL"
    | "WP"
    | "IN"
    | "SAV"
    | "INV"
    | "type"
  >;
  indent?: boolean;
  prefix?: string;
}) => {
  return (
    <TableRow>
      <TableCell
        sx={{
          pl: indent ? 3 : 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: "24ch",
          textOverflow: "ellipsis",
        }}
        size="small"
      >
        {prefix}
        {row.name}
      </TableCell>
      <TableCell size="small">{row.M}</TableCell>
      <TableCell size="small">{row.WS}</TableCell>
      <TableCell size="small">{row.BS}</TableCell>
      <TableCell size="small">{row.S}</TableCell>
      <TableCell size="small">{row.T}</TableCell>
      <TableCell size="small">{row.W}</TableCell>
      <TableCell size="small">{row.I}</TableCell>
      <TableCell size="small">{row.A}</TableCell>
      <TableCell size="small">{row.LD}</TableCell>
      <TableCell size="small">{row.CL}</TableCell>
      <TableCell size="small">{row.WP}</TableCell>
      <TableCell size="small">{row.IN}</TableCell>
      <TableCell size="small">{row.SAV}</TableCell>
      <TableCell size="small">{row.INV}</TableCell>
      <TableCell size="small">{row.type}</TableCell>
    </TableRow>
  );
};

function AdditionalRows({
  parentProfile,
  skippedParentRow,
  profiles,
}: {
  parentProfile: Profile;
  skippedParentRow?: boolean;
  profiles: Profile[];
}) {
  const prefixes = {
    "Iron Shield": "Vault Warden - ",
    "Foe Spear": "Vault Warden - ",
  };

  return (
    parentProfile.additional_stats
      // Hide mounts, which are in a separate table
      ?.filter((stat) => stat.type !== "mount")

      // Hide additional profiles that are already displayed at top-level.
      ?.filter(
        (stat) => !profiles.find((profile) => profile.name === stat.name),
      )

      // Convert additional rows to table rows
      ?.map((additionalRow, aIndex) => (
        <ReferenceRow
          row={additionalRow}
          key={aIndex}
          indent={!skippedParentRow}
          prefix={skippedParentRow ? prefixes[additionalRow.name] : ""}
        />
      ))
  );
}

export const QuickReferenceTable = ({
  profiles,
  noCaption,
}: QuickReferenceTableProps) => {
  const {
    preferences: { removePdfPageBreak },
  } = useUserPreferences();

  const mounts = profiles
    .flatMap(
      (profile) =>
        profile.additional_stats?.filter((stat) => stat.type === "mount") || [],
    )
    .filter(function (item: Profile, index: number, self: Profile[]) {
      return index === self.findIndex((other) => other.name === item.name);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const units = profiles

  return (
    <>
      <TableContainer
        id="pdf-quick-ref"
        component="div"
        className={removePdfPageBreak ? "" : "page-break"}
      >
        {noCaption !== true && (
          <Typography variant="h5">Quick reference sheet</Typography>
        )}
        <Table>
          <TableHead>
            <TableRow>
                <TableCell />
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
            {units.map((row, index) => {
              const skippedParentRow = [
                "Vault Warden Team",
                "Uruk-Hai Demolition Team",
                "Bard's Family",
                "Barricade",
                "Spiked Barricade",
                "Boiling Oil",
                "Rallying Point",
                "Rocks",
                "Siege Ladder",
                "Battering Ram",
                "Siege Tower",
              ].includes(row.name);

              return (
                <Fragment key={index}>
                  {!skippedParentRow && <ReferenceRow row={row} />}
                  <AdditionalRows
                    parentProfile={row}
                    skippedParentRow={skippedParentRow}
                    profiles={profiles}
                  />
                </Fragment>
              );
            })}
          </TableBody>
        </Table>

        {mounts.length > 0 && (
          <Table sx={{ mt: 2 }}>
            <Typography
              component="caption"
              style={{
                captionSide: "top",
                textAlign: "center",
                padding: "0px",
              }}
            >
              Mounts
            </Typography>
            <TableHead>
              <TableRow>
                <TableCell />
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
              {mounts.map((additionalRow, aIndex) => (
                <ReferenceRow row={additionalRow} key={aIndex} />
              ))}
            </TableBody>
          </Table>
        )}

      </TableContainer>
    </>
  );
};
