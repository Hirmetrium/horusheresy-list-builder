import data from "../assets/data/warning_rules.json";
import { useUserPreferences } from "../state/preference";
import { isSelectedUnit, Roster } from "../types/roster.ts";
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
    ) {
    const heroicTiers = roster.warbands
      .filter(
        ({ hero }) => isSelectedUnit(hero) && hero.unit_type.includes("Primary Detachment"),
      )
      .map(({ hero }) => hero)
      .map(({ unit_type }) => unit_type)
      .filter((t, i, s) => s.findIndex((o) => o === t) === i);

    const leaderTier = roster.warbands.find(
      (wb) => wb.id === roster.metadata.leader,
    )?.hero?.unit_type;
    const leaderTierIndex = heroicTiers.findIndex(
      (tier) => tier === leaderTier,
    );

    if (leaderTierIndex === -1) {
      // warband was deleted... so there actually isn't a leader...
      warnings.push({
        warning: `An army list should always have Primary Detachment.`,
        type: undefined,
        dependencies: [],
      });
    }
  } 
  

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
