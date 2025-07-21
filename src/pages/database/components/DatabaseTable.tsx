import { TableSortLabel } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MouseEvent } from "react";
import { useScreenSize } from "../../../hooks/useScreenSize.ts";
import { useThemeContext } from "../../../theme/ThemeContext.tsx";
import { ArmyType, Option, UnitType } from "../../../types/hh3-data.types.ts";
import { Profile } from "../../../types/profile-data.types.ts";
import { Order } from "../utils/sorting.ts";
import { DatabaseTableRow } from "./DatabaseTableRow.tsx";

export type DatabaseRowData = {
  army_list: string[];
  profile: Profile;
  unit_type: UnitType[];
  profile_origin: string;
  searchString: string;
  name: string;
  option_mandatory: boolean;
  options: Option[];
  army_type: ArmyType;
};

interface DatabaseTableProps {
  order: Order;
  orderBy: string;
  createSortHandler: (property: string) => (event: MouseEvent<unknown>) => void;
  rows: DatabaseRowData[];
}

export const DatabaseTable = ({
  order,
  orderBy,
  createSortHandler,
  rows,
}: DatabaseTableProps) => {
  const screen = useScreenSize();
  const { mode } = useThemeContext();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader size="small">
        <TableHead
          sx={{
            "& > tr > th": {
              backgroundColor: (theme) =>
                mode === "dark"
                  ? theme.palette.grey.A700
                  : theme.palette.grey.A200,
            },
          }}
        >
          <TableRow>
            <TableCell />
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={createSortHandler("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "profile_origin"}
                direction={orderBy === "profile_origin" ? order : "asc"}
                onClick={createSortHandler("profile_origin")}
              >
                Origin
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">Card</TableCell>
            {screen.isDesktop && (
              <>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "M"}
                    direction={orderBy === "M" ? order : "asc"}
                    onClick={createSortHandler("M")}
                  >
                    Mv / Range
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "profile.WS"}
                    direction={orderBy === "profile.WS" ? order : "asc"}
                    onClick={createSortHandler("profile.WS")}
                  >
                    Fv
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "profile.BS"}
                    direction={orderBy === "profile.BS" ? order : "asc"}
                    onClick={createSortHandler("profile.BS")}
                  >
                    Sv
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "profile.S"}
                    direction={orderBy === "profile.S" ? order : "asc"}
                    onClick={createSortHandler("profile.S")}
                  >
                    S
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "profile.T"}
                    direction={orderBy === "profile.T" ? order : "asc"}
                    onClick={createSortHandler("profile.T")}
                  >
                    D
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "profile.W"}
                    direction={orderBy === "profile.W" ? order : "asc"}
                    onClick={createSortHandler("profile.W")}
                  >
                    A
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "profile.I"}
                    direction={orderBy === "profile.I" ? order : "asc"}
                    onClick={createSortHandler("profile.I")}
                  >
                    W
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "profile.A"}
                    direction={orderBy === "profile.A" ? order : "asc"}
                    onClick={createSortHandler("profile.A")}
                  >
                    C
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "profile.LD"}
                    direction={orderBy === "profile.LD" ? order : "asc"}
                    onClick={createSortHandler("profile.LD")}
                  >
                    I
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "CL"}
                    direction={orderBy === "CL" ? order : "asc"}
                    onClick={createSortHandler("CL")}
                  >
                    M
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "WP"}
                    direction={orderBy === "WP" ? order : "asc"}
                    onClick={createSortHandler("WP")}
                  >
                    W
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "IN"}
                    direction={orderBy === "IN" ? order : "asc"}
                    onClick={createSortHandler("IN")}
                  >
                    F
                  </TableSortLabel>
                </TableCell>
              </>
            )}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <DatabaseTableRow
              key={`${row.name}-${row.profile_origin}`}
              row={row}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
