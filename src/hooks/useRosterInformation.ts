import { useParams } from "react-router-dom";
import { hh3Data } from "../assets/data.ts";
import { handleSpecialRestriction } from "../components/common/unit-selection/special-hero-selection-rules.ts";
import { useRosterBuildingState } from "../state/roster-building";
import { Unit } from "../types/hh3-data.types.ts";
import { isSelectedUnit, Roster } from "../types/roster.ts";
import { isNotNull } from "../utils/nulls.ts";
import { slugify } from "../utils/string.ts";

export type RosterInformationFunctions = {
  roster: Roster;
  getSetOfModelIds: (roster?: Roster) => string[];
  getSetOfModelIdsInWarband: (warbandId: string, roster?: Roster) => string[];
  getAdjustedMetaData: (roster?: Roster) => Roster["metadata"];
  canSupportMoreWarbands: (roster?: Roster) => boolean;
};

export const useRosterInformation = (): RosterInformationFunctions => {
  const { rosterId } = useParams();
  const currentRoster = useRosterBuildingState(
    (state): Roster => state.rosters.find(({ id }) => id === rosterId),
  );

  function getModelIdsFromOptions(unit: Unit): string[] {
    const armyList = slugify(unit.army_list);
    if (unit.name === "Gandalf the White") {
      const hasPippinPassenger = !!unit.options.find(
        ({ name, quantity }) => name === "Pippin" && quantity > 0,
      );
      if (hasPippinPassenger) {
        return [`[${armyList}] peregrin-took`];
      }
    }
    if (unit.name === "Arwen") {
      const hasFrodoPassenger = !!unit.options.find(
        ({ name, quantity }) => name === "Frodo Baggins" && quantity > 0,
      );
      if (hasFrodoPassenger) {
        return [`[${armyList}] frodo-baggins`];
      }
    }
    if (unit.name === "Eowyn") {
      const hasMerryPassenger = !!unit.options.find(
        ({ name, quantity }) => name === "Merry" && quantity > 0,
      );
      if (hasMerryPassenger) {
        return [`[${armyList}] meriadoc-brandybuck`];
      }
    }
    if (unit.name === "Treebeard") {
      const hasMerryPassenger = !!unit.options.find(
        ({ name, quantity }) => name === "Merry & Pippin" && quantity > 0,
      );
      if (hasMerryPassenger) {
        return [
          `[${armyList}] peregrin-took`,
          `[${armyList}] meriadoc-brandybuck`,
        ];
      }
    }
    return [];
  }

  function getSetOfModelIds(roster: Roster = currentRoster) {
    if (!roster) return [];
    return roster.warbands
      .flatMap((wb) => [wb.hero, ...wb.units])
      .filter(isNotNull)
      .filter(isSelectedUnit)
      .flatMap((unit) => [unit.model_id, ...getModelIdsFromOptions(unit)])
      .filter(
        (item, index, self) =>
          self.findIndex((other) => other === item) === index,
      );
  }

  function getSetOfModelIdsInWarband(
    warbandId: string,
    roster: Roster = currentRoster,
  ) {
    if (!roster) return [];
    return roster.warbands
      .filter((wb) => wb.id === warbandId)
      .flatMap((wb) => [wb.hero, ...wb.units])
      .filter(isNotNull)
      .filter(isSelectedUnit)
      .map((unit) => unit.model_id)
      .filter(
        (item, index, self) =>
          self.findIndex((other) => other === item) === index,
      );
  }

  function getAdjustedMetaData(
    roster: Roster = currentRoster,
  ): Roster["metadata"] {
    if (
      roster.armyList === "Rivendell" &&
      getSetOfModelIds(roster).includes("[rivendell] elrond")
    ) {
      
      return {
        ...roster.metadata,
      };
    }

    if (roster.armyList === "The Three Trolls") {
      return {
        ...roster.metadata,
        points:
          roster.metadata.points +
          (roster.metadata.tttSpecialUpgrades?.length * 50 || 0),
      };
    }

    return roster.metadata;
  }

  function canSupportMoreWarbands(roster: Roster = currentRoster): boolean {
    if (!roster) return false;


    const setOfModelIds = getSetOfModelIds(roster);
    const stillAvailableWarbandLeaders = Object.values(hh3Data)
      .filter(
        ({ unit_type }) =>
          unit_type.includes("Hero") 
      )
      .filter(
        (unit) =>
          unit.army_list === roster.armyList && handleSpecialRestriction(unit),
      )
      .filter(
        (unit: Unit) => !unit.unique || !setOfModelIds.includes(unit.model_id),
      );

    if (stillAvailableWarbandLeaders.some((unit) => !unit.unique)) {
      // if there are any non-unique heroes, you can spam warbands.
      return true;
    }

    const warbandsInNeedOfHero = roster.warbands.filter(
      (warband) => !warband.hero,
    ).length;

    return stillAvailableWarbandLeaders.length - warbandsInNeedOfHero > 0;
  }

  return {
    roster: currentRoster,
    getSetOfModelIds,
    getSetOfModelIdsInWarband,
    getAdjustedMetaData,
    canSupportMoreWarbands,
  };
};
