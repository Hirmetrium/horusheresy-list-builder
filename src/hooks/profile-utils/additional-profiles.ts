import { heroConstraintData } from "../../assets/data.ts";
import { Profile as RawProfile } from "../../types/profile-data.types.ts";
import { SelectedUnit } from "../../types/roster.ts";
import { duplicateProfiles } from "./deduplication.ts";
import { Profile } from "./profile.type.ts";



function getAdditionalProfilesFromHeroConstraintsData(
    unit: SelectedUnit,
): Profile[] {
    const extraConstraints = heroConstraintData[unit.model_id];
    if (!extraConstraints) return [];

}

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
function getAdditionalProfilesFromProfileData(
    profile: RawProfile,
) {
    return (
        profile?.additional_stats
            ?.map((profile) => {

                return { ...profile };
            }) || []
    );
}

export function getAdditionalStats(
    unit: SelectedUnit,
    profile: RawProfile,
): Profile[] {
    const additionalStats = [];

    additionalStats.push(...getAdditionalProfilesFromProfileData(profile));
    additionalStats.push(...getAdditionalProfilesFromHeroConstraintsData(unit));

    return additionalStats.filter(duplicateProfiles());
}
