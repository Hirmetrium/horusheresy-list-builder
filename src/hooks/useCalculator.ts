import {
  isSelectedUnit,
  Roster,
  SelectedUnit,
  Warband,
} from "../types/roster.ts";
import { isNotNull } from "../utils/nulls.ts";

export const useCalculator = () => {
  function recalculatePointsForUnit(unit: SelectedUnit): SelectedUnit {
    const base = unit.base_points;
    const optionCost = unit.options
      .map((option) => option.points * option.quantity || 0)
      .reduce((a, b) => a + b, 0);

    const pointsPerUnit = base + optionCost;
    const pointsTotal = pointsPerUnit * unit.quantity;

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
      .reduce(
        (a, b) => a + b,
      );

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
        units:  totalUnits,
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
