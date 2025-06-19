import { UnitType } from "../../types/hh3-data.types.ts";
import { SelectedUnit } from "../../types/roster.ts";

export const unitSortOrder: Record<UnitType, number> = {
  "Crusade Primary Detachment": 1,
  "Apex Detachment: Combat Retinue": 5,
  "Apex Detachment: Officer Cadre": 6,
  "Apex Detachment: Army Vanguard": 7,
  "Auxillary Detachment: Armoured Fist": 8,
  "Auxillary Detachment: Tactical Support": 9,
  "Auxillary Detachment: Armoured Support": 10,
  "Auxillary Detachment: Heavy Support": 11,
  "Auxillary Detachment: Combat Pioneers": 12,
  "Auxillary Detachment: Shock Assault": 13,
  "Auxillary Detachment: First Strike": 14,
  "Warlord Detachment": 2,
  "Lord of War Detachment": 3,
  "Allied Detachment": 4,
  "High Command": 1,
  "Command": 2,
  "Retinue": 1,
  "Elite": 1,
  "Shock Assault": 1,
  "Tactical Support": 4,
  "Heavy Support": 1,
  "Troops": 3,
  "Combat Pioneers": 1,
  "Transports": 4,
  "Tank": 5,
  "First Strike": 1,
  "Lord of War": 1,
  "Warlord": 1
};

/**
 * Sorting function to sort units based on their heroic tier.
 *
 * @param a
 * @param b
 */
export function byHeroicTier(a: SelectedUnit, b: SelectedUnit) {
  // if (a.unit_type.includes("Hero") && a.unique) {
  //   if (b.unit_type.includes("Hero") && b.unique) {
  //     return unitSortOrder[a.unit_type] - unitSortOrder[b.unit_type];
  //   }
  //   return -1;
  // }

  return unitSortOrder[a.unit_type] - unitSortOrder[b.unit_type];
}
