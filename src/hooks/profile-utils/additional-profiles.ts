import { Profile as RawProfile } from "../../types/profile-data.types.ts";
import { SelectedUnit } from "../../types/roster.ts";
import { duplicateProfiles } from "./deduplication.ts";
import { Profile } from "./profile.type.ts";



/**
 * Get the profiles for the mount listed in the default wargear and chosen options.
 *
 * @param unit
 * @param profile
 */


/**
 * Get addition profiles listed as part of the original profiles "additional_stats".
 * @param profile
 * @param unit
 */

export function getAdditionalStats(
  unit: SelectedUnit,
  profile: RawProfile,
): Profile[] {
  const additionalStats = [];

  return additionalStats.filter(duplicateProfiles());
}
