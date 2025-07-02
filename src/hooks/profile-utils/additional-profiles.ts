import { heroConstraintData, profileData } from "../../assets/data.ts";
import { Option } from "../../types/hh3-data.types.ts";
import { Profile as RawProfile } from "../../types/profile-data.types.ts";
import { SelectedUnit } from "../../types/roster.ts";
import { selectedOptionWithName } from "../../utils/options.ts";
import { duplicateProfiles } from "./deduplication.ts";
import { Profile } from "./profile.type.ts";

const passenger = ({ type, quantity }: Option) =>
    type === "passenger" && quantity > 0;

function unusedAdditionalStats(
    unit: SelectedUnit,
): (stats: Profile) => boolean {
    return (stats) => {

        return true;
    };
}

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
    unit: SelectedUnit,
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

    additionalStats.push(...getAdditionalProfilesFromProfileData(profile, unit));
    additionalStats.push(...getAdditionalProfilesFromHeroConstraintsData(unit));

    return additionalStats.filter(duplicateProfiles());
}
