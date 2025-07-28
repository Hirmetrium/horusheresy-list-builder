import { UnitType } from "../../types/hh3-data.types.ts";
import { SelectedUnit } from "../../types/roster.ts";

export const unitSortOrder: Record<UnitType, number> = {
  "Primary Detachment": 1,
  "Apex Detachment": 2,
  "Auxillary Detachment": 3,
  "Additional Detachment": 4,
  "Logistical Benefit": 5,
  "Allied Detachment": 6,
  "High Command": 7,
  "Command": 8,
  "Retinues": 9,
  "Elites": 10,
  "Heavy Assault": 11,
  "Troops": 12,
  "Support": 13,
  "War-Engines": 14,
  "Transports": 15,
  "Heavy Transports": 16,
  "Recon": 17,
  "Fast Attack": 18,
  "Armour": 19,
  "Lords of War": 20,
  "Warlord": 21
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
