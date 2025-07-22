import { AutoAwesome, HowToReg } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { Changelog } from "./drawers/Changelog.tsx";
import { SpecialRulesSearch } from "./drawers/SpecialRulesSearch.tsx";
import { UnitSelector } from "./drawers/UnitSelector.tsx";

export enum DrawerTypes {
  UNIT_SELECTOR = "UNIT_SELECTOR",
  SPECIAL_RULE_SEARCH = "SPECIAL_RULE_SEARCH",
  CHANGELOG = "CHANGELOG",
}

export type DrawerProps = {
  children: ReactNode;
  title: string | ReactNode;
};

export const drawers = new Map<DrawerTypes, DrawerProps>([
  [
    DrawerTypes.UNIT_SELECTOR,
    {
      title: (
        <Stack alignItems="center" direction="row" gap={2}>
          <HowToReg /> Unit Selector
        </Stack>
      ),
      children: <UnitSelector />,
    },
  ],
  [
    DrawerTypes.SPECIAL_RULE_SEARCH,
    {
      title: (
        <Stack alignItems="center" direction="row" gap={2}>
          <AutoAwesome /> Special Rules
        </Stack>
      ),
      children: <SpecialRulesSearch />,
    },
  ],
  [
    DrawerTypes.CHANGELOG,
    {
      title: "Changelog",
      children: <Changelog />,
    },
  ],
]);
