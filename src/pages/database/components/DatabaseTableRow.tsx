import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Fragment, useState } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SquareIconButton } from "../../../components/common/icon-button/SquareIconButton.tsx";
import { DrawerTypes } from "../../../components/drawer/drawers.tsx";
import { ModalTypes } from "../../../components/modal/modals.tsx";
import { useScreenSize } from "../../../hooks/useScreenSize.ts";
import { useAppState } from "../../../state/app";
import { useThemeContext } from "../../../theme/ThemeContext.tsx";
import { DatabaseRowData } from "./DatabaseTable.tsx";
import { ExtraInfoRow } from "./ExtraInformationSection.tsx";

export const DatabaseTableRow = ({ row }: { row: DatabaseRowData }) => {
  const { palette } = useTheme();
  const { mode } = useThemeContext();

  const screen = useScreenSize();
  const { setCurrentModal, openSidebar } = useAppState();
  const [open, setOpen] = useState(false);


  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset !important" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.profile_origin}</TableCell>
        <TableCell align="center">
          <SquareIconButton
            icon={<BsFillPersonVcardFill />}
            iconColor={palette.primary.contrastText}
            backgroundColor={
              mode === "dark" ? palette.grey.A400 : palette.grey.A700
            }
            backgroundColorHover={
              mode === "dark" ? palette.grey.A700 : palette.grey["900"]
            }
            onClick={() => {
              setCurrentModal(ModalTypes.PROFILE_CARD, {
                unit: {
                  name: row.name,
                  profile_origin: row.profile_origin,
                },
                title: row.name,
              });
            }}
          />
        </TableCell>
        {screen.isDesktop && (
          <>
            <TableCell align="center">{row.profile.M}</TableCell>
            <TableCell align="center">{row.profile.WS}</TableCell>
            <TableCell align="center">{row.profile.BS}</TableCell>
            <TableCell align="center">{row.profile.S}</TableCell>
            <TableCell align="center">{row.profile.T}</TableCell>
            <TableCell align="center">{row.profile.W}</TableCell>
            <TableCell align="center">{row.profile.I}</TableCell>
            <TableCell align="center">{row.profile.A}</TableCell>
            <TableCell align="center">{row.profile.LD}</TableCell>
            <TableCell align="center">{row.profile.CL}</TableCell>
            <TableCell align="center">{row.profile.WP}</TableCell>
            <TableCell align="center">{row.profile.IN}</TableCell>
            </>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={16}>
          <Collapse in={open} timeout="auto">
            <Stack sx={{ p: 2 }} gap={1}>
              {!screen.isDesktop && (
                <ExtraInfoRow title="Stats">
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Mv</TableCell>
                          <TableCell align="center">WS</TableCell>
                          <TableCell align="center">BS</TableCell>
                          <TableCell align="center">S</TableCell>
                          <TableCell align="center">T</TableCell>
                          <TableCell align="center">W</TableCell>
                          <TableCell align="center">I</TableCell>
                          <TableCell align="center">A</TableCell>
                          <TableCell align="center">LD</TableCell>
                          <TableCell align="center">CL</TableCell>
                          <TableCell align="center">WP</TableCell>
                          <TableCell align="center">IN</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">{row.profile.M}</TableCell>
                          <TableCell align="center">{row.profile.WS}</TableCell>
                          <TableCell align="center">{row.profile.BS}</TableCell>
                          <TableCell align="center">{row.profile.S}</TableCell>
                          <TableCell align="center">{row.profile.T}</TableCell>
                          <TableCell align="center">{row.profile.W}</TableCell>
                          <TableCell align="center">{row.profile.I}</TableCell>
                          <TableCell align="center">{row.profile.A}</TableCell>
                          <TableCell align="center">{row.profile.LD}</TableCell>
                          <TableCell align="center">{row.profile.CL}</TableCell>
                          <TableCell align="center">{row.profile.WP}</TableCell>
                          <TableCell align="center">{row.profile.IN}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ExtraInfoRow>
              )}
              <ExtraInfoRow title="Available Army Lists">
                <Typography>{row.army_list.join(", ")}</Typography>
              </ExtraInfoRow>
              {row.profile.wargear.length > 0 && (
                <ExtraInfoRow title="Wargear">
                  <Typography>{row.profile.wargear.join(", ")}</Typography>{" "}
                </ExtraInfoRow>
              )}

              {(row.profile.special_rules.length > 0 ||
                row.profile.active_or_passive_rules.length > 0) && (
                <ExtraInfoRow title="Special Rules">
                  <Typography>
                    {row.profile.special_rules.map((rule, index, self) => (
                      <Fragment key={rule}>
                        <Box
                          component="span"
                          sx={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            "&:hover": {
                              color: (theme) => theme.palette.primary.main,
                            },
                          }}
                          onClick={() => {
                            openSidebar(DrawerTypes.SPECIAL_RULE_SEARCH, {
                              searchKeyword: rule.replace(/\(.*?\)/g, ""),
                            });
                          }}
                        >
                          {rule}
                        </Box>
                        {index < self.length - 1 ||
                          (row.profile.active_or_passive_rules.length > 0 &&
                            ",")}{" "}
                      </Fragment>
                    ))}
                    {row.profile.active_or_passive_rules.map(
                      (rule, index, self) => (
                        <Fragment key={rule.name}>
                          <Box
                            component="span"
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              "&:hover": {
                                color: (theme) => theme.palette.primary.main,
                              },
                            }}
                            onClick={() => {
                              setCurrentModal(ModalTypes.PROFILE_CARD, {
                                unit: {
                                  name: row.name,
                                  profile_origin: row.profile_origin,
                                },
                                title: row.name,
                              });
                            }}
                          >
                            {rule.name}
                          </Box>
                          {index < self.length - 1 && ","}{" "}
                        </Fragment>
                      ),
                    )}
                  </Typography>
                </ExtraInfoRow>
              )}
              {row.options.length > 0 && (
                <ExtraInfoRow title="Possible options">
                  <Typography>
                    &quot;{row.options.map((o) => o.name).join('", "')}&quot;
                  </Typography>
                </ExtraInfoRow>
              )}
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
