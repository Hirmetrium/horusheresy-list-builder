import { v4 } from "uuid";
import { getSumOfUnits } from "../../../components/common/roster/totalUnits.ts";
import { convertRosterToProfiles } from "../../../hooks/profile-utils/profiles.ts";
import { Profile } from "../../../types/profile-data.types.ts";
import {
    FreshUnit,
    isSelectedUnit,
    Roster,
    SelectedUnit,
} from "../../../types/roster.ts";
import { CustomTracker, Trackable } from "./index.ts";

const convertToStats = (
    name: string | number,
    unit: SelectedUnit,
    isArmyLeader: boolean,
): Trackable => ({
    name: String(name),
    profile_origin: unit.profile_origin,
    leader: isArmyLeader,
});

const mapHeroToStats = (
    unit: SelectedUnit | FreshUnit ,
    isArmyLeader?: boolean,
): Trackable | null => {
    // check if a unit is selected (and not an empty selector box)
    if (!isSelectedUnit(unit)) return null;
    // If you have a hero name, use it; otherwise, fallback to unit.name
    const heroName = (unit as SelectedUnit).name || "Unknown Hero";
    return convertToStats(heroName, unit as SelectedUnit, !!isArmyLeader);
};

const getHeroes = (roster: Roster): Trackable[] => {
    return roster.warbands
        .flatMap(({ hero, units, id }) => [
            mapHeroToStats(hero, roster.metadata.leader === id),
            ...units.map((unit) => mapHeroToStats(unit)),
        ])
        .filter((v) => !!v);
};

const mapListToTrackers = (
    list: {
        additional_stats: Profile["additional_stats"];
        W?: number;
        name?: string;
    }[],
    units: { amount: number; name: string }[],
    includeSelf: boolean = true,
) => {
    return list
        .map((unit) => ({
            ...unit,
            amount: units.find((profile) => profile.name === unit.name)?.amount || 1,
        }))
        .flatMap(({ amount, name, ...unit }) =>
            Array.from({ length: amount }, (_, index) => ({
                ...unit,
                name: amount > 1 ? `${name} (${index + 1})` : name,
            })),
        )
        .flatMap((tracker) => {
            if (!tracker.additional_stats)
                return includeSelf ? [{ name: tracker.name, W: tracker.W }] : [];
            return includeSelf
                ? [
                    { name: tracker.name, W: tracker.W },
                    ...tracker.additional_stats
                        .filter((additionalTracker) => Number(additionalTracker.W) >= 2)
                        .map(({ name, W }) => ({
                            name: name,
                            W: Number(W),
                        })),
                ]
                : tracker.additional_stats
                    .filter((additionalTracker) => Number(additionalTracker.W) >= 2)
                    .map(({ name, W }) => ({
                        name: name,
                        W: Number(W),
                    }));
        })
        .map((tracker) => ({
            id: v4(),
            name: tracker.name,
            value: tracker.W,
            maxValue: tracker.W,
        }));
};

const getListOfMultiWoundModels = (roster: Roster): CustomTracker[] => {
    const units = getSumOfUnits(roster, { ignoreOptions: true }).map((unit) => ({
        name: unit.name,
        amount: unit.quantity,
    }));

    const { profiles } = convertRosterToProfiles(roster);

    const trackers = mapListToTrackers(
        profiles
            .map(({ name, additional_stats }) => ({
                name,
                additional_stats,
            })),
        units,
    );

    return trackers;
};

export const createGameState = (
    roster: Roster,
): {
    trackables: Trackable[];
    customTrackers: CustomTracker[];
    casualties: number;
    heroCasualties: number;
} => ({
    trackables: getHeroes(roster),
    customTrackers: getListOfMultiWoundModels(roster),
    casualties: 0,
    heroCasualties: 0,
});
