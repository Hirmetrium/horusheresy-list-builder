import { v4 as uuid } from "uuid";
import { Roster, Warband } from "../../../types/roster.ts";
import { Slice } from "../../Slice.ts";
import { RosterBuildingState } from "../index.ts";

type RosterFunctions = {
  createRoster: (roster: Roster) => void;
  updateRoster: (roster: Roster, originalRosterId?: string) => void;
  deleteRoster: (roster: Roster) => void;
};

export type RosterState = {
  rosters: Roster[];
} & RosterFunctions;

export const emptyWarband: Warband = {
  id: uuid(),
  hero: null,
  meta: {
    num: 1,
    points: 0,
    units: 0,
    heroes: 0,
    maxUnits: "-",
  },
  units: [],
};

export const emptyRoster: Roster = {
  version: BUILD_VERSION,
  id: "",
  name: "",
  armyList: "",
  warbands: [emptyWarband],
  metadata: {
    leader: "",
    points: 0,
    units: 0,
    heroes: 0,
  },
};

const initialState = {
  rosters: [],
};

export const rosterSlice: Slice<RosterBuildingState, RosterState> = (
  set,
  get,
) => ({
  ...initialState,

  createRoster: (roster) => {
    set(
      (state) => ({
        rosters: [...state.rosters, roster],
        groups: get().groups.map((group) =>
          roster.group && roster.group === group.id
            ? { ...group, rosters: [...group.rosters, roster.id] }
            : group,
        ),
      }),
      undefined,
      "CREATE_ROSTER",
    );
  },

  updateRoster: (updatedRoster, originalRosterId = updatedRoster.id) => {
    set(
      (state) => ({
        rosters: state.rosters.map((roster) =>
          roster.id === originalRosterId ? updatedRoster : roster,
        ),
      }),
      undefined,
      "UPDATE_ROSTER",
    );
  },

  deleteRoster: (roster) => {
    set(
      (state) => ({
        rosters: state.rosters.filter(({ id }) => roster.id !== id),
        groups: get().groups.map((group) =>
          roster.group && roster.group === group.id
            ? {
                ...group,
                rosters: group.rosters.filter(
                  (rosterId) => rosterId !== roster.id,
                ),
              }
            : group,
        ),
      }),
      undefined,
      "DELETE_ROSTER",
    );
  },
});
