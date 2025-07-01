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

    return extraConstraints.extra_profiles
        .map((name: string): Profile => {
            const rawProfile: RawProfile | undefined =
                profileData[unit.profile_origin][name];

            if (!rawProfile) return null;
            return { ...rawProfile, name };
        })
        .filter((profile: Profile) => !!profile)
        .filter(unusedAdditionalStats(unit))
        .flatMap((profile: Profile): Profile[] => {
            const extraProfileMWFW = unit.MWFW.find(([mwfName]) =>
                String(mwfName).includes(profile.name),
            );
            if (extraProfileMWFW) {
                const [HM, HW, HF] = extraProfileMWFW[1].split(":");
                return [
                    {
                        ...profile,
                        HM,
                        HW,
                        HF,
                    },
                ];
            }
            return [
                {
                    ...profile,
                    type: profile.name === "Windlance" ? "Siege Engine" : profile.type,
                    additional_stats:
                        [
                            "[garrison-of-dale] girion-lord-of-dale",
                            "[army-of-lake-town] bard-the-bowman",
                        ].includes(unit.model_id) && profile.name === "Windlance"
                            ? []
                            : profile.additional_stats,
                },
            ];
        })
        .filter((v) => !!v);
}

/**
 * Get the profiles for the mount listed in the default wargear and chosen options.
 *
 * @param unit
 * @param profile
 */
function getAdditionalProfilesFromMountOptions(
    profile: RawProfile,
    unit: SelectedUnit,
): Profile[] {
    const chosenMounts: Profile[] = unit.options
        ?.filter((option) => option.type === "mount" && option.quantity > 0)
        .filter(
            (option, _, options) =>
                !options.find(
                    (other) => other.name === `Upgrade to Armoured ${option.name}`,
                ),
        )
        ?.map((mount) => {
            const name = mount.mount_name || mount.name;
            const actualName = name.replaceAll("Upgrade to", "").trim();
            const mountMwfw = unit.MWFW.find(([mwfName]) =>
                String(mwfName).includes(actualName),
            ) || ["", "-:-:-:-"];

            return {
                ...profileData.Mounts[actualName],
                name: actualName,
                type: "mount",
            };
        });

    if (!profile.wargear || profile.wargear.length === 0) {
        // if there is no default wargear on the profile, we can short-circuit to only mounts from options.
        return chosenMounts;
    }

    const defaultMounts =
        profile.wargear
            .filter((wargear) => Object.keys(profileData.Mounts).includes(wargear))
            .map((mount) => ({
                ...profileData.Mounts[mount],
                name: mount,
                type: "mount",
            })) || [];

    return [...chosenMounts, ...defaultMounts];
}

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
    additionalStats.push(...getAdditionalProfilesFromMountOptions(profile, unit));

    return additionalStats.filter(duplicateProfiles());
}
