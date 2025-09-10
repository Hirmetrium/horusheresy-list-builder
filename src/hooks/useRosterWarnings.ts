import data from "../assets/data/warning_rules.json";
import { useUserPreferences } from "../state/preference";
import { Roster } from "../types/roster.ts";
import { WarningRule, WarningRules } from "../types/warning-rules.types.ts";
import { useRosterInformation } from "./useRosterInformation.ts";

function checkRequiresOne(rule: WarningRule, setOfModelIds: string[]): boolean {
  return !rule.dependencies.some((compulsoryModel) =>
    setOfModelIds.includes(compulsoryModel),
  );
}

function checkRequiresAll(rule: WarningRule, setOfModelIds: string[]): boolean {
  return !rule.dependencies.every((compulsoryModel) =>
    setOfModelIds.includes(compulsoryModel),
  );
}

function checkCompulsory(rule: WarningRule, setOfModelIds: string[]): boolean {
  return !rule.dependencies.every((compulsoryModel) =>
    setOfModelIds.includes(compulsoryModel),
  );
}

function checkIncompatible(
  rule: WarningRule,
  setOfModelIds: string[],
): boolean {
  return rule.dependencies.some((incompatibleModel) =>
    setOfModelIds.includes(incompatibleModel),
  );
}

function extraScriptedRosterWarnings(
  roster: Roster,
  ignoreCompulsoryArmyGeneral: boolean,
): WarningRule[] {
  const warnings = [];

  
  if (
    roster.metadata.leader &&
    (!roster.metadata.leaderCompulsory || ignoreCompulsoryArmyGeneral)
  ) 
  

  return warnings;
}

function isActiveRule(setOfModelIds: string[]) {
  return (rule: WarningRule) => {
    switch (rule.type) {
      case "requires_one":
        return checkRequiresOne(rule, setOfModelIds);
      case "requires_all":
        return checkRequiresAll(rule, setOfModelIds);
      case "compulsory":
        return checkCompulsory(rule, setOfModelIds);
      case "incompatible":
        return checkIncompatible(rule, setOfModelIds);
      default:
        return true;
    }
  };
}

export const useRosterWarnings = (): WarningRule[] => {
  const rosterInformation = useRosterInformation();
  const { preferences } = useUserPreferences();
  const setOfModelIds = rosterInformation.getSetOfModelIds();
  const allWarnings = data as WarningRules;

  const possibleWarnings = [
    ...(allWarnings[rosterInformation.roster.armyList] || []),
    ...setOfModelIds.flatMap((model) => allWarnings[model]),
    ...extraScriptedRosterWarnings(
      rosterInformation.roster,
      preferences.allowCompulsoryGeneralDelete,
    ),
  ].filter((v) => !!v);

  if (!possibleWarnings || possibleWarnings.length === 0) return [];

  return possibleWarnings.filter(isActiveRule(setOfModelIds));
};
