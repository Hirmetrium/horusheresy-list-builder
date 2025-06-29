import { Unit } from "./hh3-data.types.ts";

export type SelectedUnit = Unit & {
  id: string;
  pointsPerUnit: number;
  pointsTotal: number;
  quantity: number;
  compulsory?: boolean;
};

export type FreshUnit = {
  id: string;
};

export type Warband = {
  id: string;
  hero: SelectedUnit | null;
  units: (FreshUnit | SelectedUnit )[];
  meta: {
    num: number;
    points: number;
    units: number;
    heroes: number;
    maxUnits: number | "-";
  };
};

export const isSelectedUnit = (
  unit: FreshUnit | SelectedUnit,
): unit is SelectedUnit => !!(unit as SelectedUnit)?.model_id;

export type Roster = {
  version: string;
  id: string;
  name: string;
  armyList: string;
  warbands: Warband[];
  group?: string;
  metadata: {
    leader: string | null;
    leaderCompulsory?: boolean;
    points: number;
    units: number;
    heroes: number;
    tttSpecialUpgrades?: string[];
    maxPoints?: number;
  };
};
