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
): Trackable[] => {
  // check if a unit is selected (and not an empty selector box)
  if (!isSelectedUnit(unit)) return null;

  return [convertToStats(name || unit.name, unit, isArmyLeader)];
};

const getHeroes = (roster: Roster): Trackable[] => {
  return roster.warbands
    .flatMap(({ hero, id }) => [
      mapHeroToStats(hero, roster.metadata.leader === id),
    ])
    .flat()
    .filter((v) => !!v);
};

const mapListToTrackers = (
  list: {
    additional_stats: Profile["additional_stats"];
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
        return includeSelf ? [{ name: tracker.name}] : [];
      return includeSelf
            });
    }
    .map((tracker) => ({
      id: v4(),
      name: tracker.name,
      permanent: true,
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

  const additionalTrackers = mapListToTrackers(
    profiles
      .filter(
        ({ type }) =>
          type?.includes("Hero")
      )
      .map(({ name, additional_stats }) => {
        return {
          name,
          additional_stats: additional_stats
            .map((stat) => ({
              ...stat,
              name: `${name} - ${stat.name}`,
            })),
        };
      }),
    units,
    false,
  );

  return [...trackers, ...additionalTrackers];
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
