import {
  isSelectedUnit,
  Roster,
  SelectedUnit,
  Warband,
} from "../types/roster.ts";
import { isNotNull } from "../utils/nulls.ts";

const heroesThatAreIncludedInTheWarbandCount = [
    "Praetor",
    "Praetor with Jump Pack",
    "Praetor in Cataphractii Terminator Armour",
    "Praetor in Tartaros Terminator Armour",
    "Praetor in Saturnine Terminator Armour",
];

function heroAdditionalUnitRosterCount(warband: Warband) {
    if (!warband.hero) return 0;

    if (heroesThatAreIncludedInTheWarbandCount.includes(warband.hero?.model_id)) {
        return 0;
    }

    return 1;
}

function heroAdditionalUnitWarbandCount(warband: Warband) {
    if (!warband.hero) return 0;
    if (warband.units
            .filter(isSelectedUnit)
            .find((unit) => unit.name === "Centurion")
    ) { return 2; }

    if (warband.units
            .filter(isSelectedUnit)
            .find((unit) => unit.name === "Legion Champion")
    ) { return 1; }

    return 0;
}

export const useCalculator = () => {
  function recalculatePointsForUnit(unit: SelectedUnit): SelectedUnit {
    const base = unit.base_points;
    const extra_points = unit.extra_points;
    const optionCost = unit.options
      .map((option) => option.points * option.quantity || 0)
      .reduce((a, b) => a + b, 0);

      const pointsPerUnit = base;
      const pointsTotal = (pointsPerUnit * unit.quantity) + extra_points + optionCost;

    return {
      ...unit,
      pointsPerUnit,
      pointsTotal,
    };
  }

  function recalculateWarband(warband: Warband): Warband {
    const totalUnits = warband.units
      .filter(isSelectedUnit)
      .map((unit) => unit.quantity )
      .reduce((a, b) => a + b,  0);


    const totalPoints = [warband.hero, ...warband.units]
      .filter(isNotNull)
      .filter(isSelectedUnit)
      .map((unit) => unit.pointsTotal)
      .reduce((a, b) => a + b, 0);

    return {
      ...warband,
      meta: {
        num: warband.meta.num,
        points: totalPoints,
        units: totalUnits + heroAdditionalUnitWarbandCount(warband),
        heroes: warband.hero ? heroAdditionalUnitRosterCount(warband) : 0,
        maxUnits: warband.hero?.warband_size ?? "-",
      },
    };
  }

  function recalculateRoster(roster: Roster): Roster {
    const summedWarbandMetadata = roster.warbands
      .map((warband) => {
        return {
          points: warband.meta.points,
          units: warband.meta.units + warband.meta.heroes,
        };
      })
      .reduce(
        (acc, item) => {
          acc.points += item.points;
          acc.units += item.units;
          return acc;
        },
        {
          points: 0,
          units: 0,
        },
      );

    return {
      ...roster,
      metadata: {
        ...roster.metadata,
        ...summedWarbandMetadata,
      },
    };
  }

  return {
    recalculatePointsForUnit,
    recalculateWarband,
    recalculateRoster,
  };
};
