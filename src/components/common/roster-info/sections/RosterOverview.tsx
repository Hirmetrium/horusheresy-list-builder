import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { useRosterInformation } from "../../../../hooks/useRosterInformation.ts";
import { RosterInformationProps } from "../RosterInformation.tsx";
import { RosterInformationSection } from "../RosterInformationSection.tsx";

export const RosterOverview: FunctionComponent<RosterInformationProps> = ({
  roster,
}) => {
  const { getAdjustedMetaData } = useRosterInformation();
  const metadata = getAdjustedMetaData(roster);

  const rows = [
    {
      label: "Points",
      value: metadata.maxPoints
        ? `${metadata.points} / ${metadata.maxPoints}`
        : metadata.points,
      valid: !metadata.maxPoints || metadata.points <= metadata.maxPoints,
    },
    {
      label: "Units",
      value: metadata.units,
    }
  ];

  return (
    <RosterInformationSection title="Roster overview">
      <TableContainer>
        <Table size="small">
          <TableBody sx={{ "* > p": { fontSize: "0.9rem !important" } }}>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography color={row.valid !== false ? "inherit" : "error"}>
                    <b>{row.label}</b>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color={row.valid !== false ? "inherit" : "error"}>
                    {row.value}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </RosterInformationSection>
  );
};
