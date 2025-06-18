export type ArmyType = "Astartes" | "Solar Auxilia";

/**
 * TODO: regenerate this list after all data is loaded.
 */
export type UnitType =
  | "High Command"
  | "Command"
  | "Troops"
  | "Transports"
  | "Retinue"
  | "Elites"
  | "Shock Assault"
  | "Tactical Support"
  | "Heavy Support"
  | "Combat Pioneers"
  | "First Strike"
  | "Warlord"
  | "Lord of War"
  | string;

/**
 * TODO: regenerate this list after all data is loaded.
 */
type OptionType =
  | "extra"
  | "one-hand"
  | "two-hand"
  | "mount"
  | null;

export type OptionDependency = {
  type: "requires-all" | "requires-one";
  condition: "in-warband" | "in-roster";
  dependencies: string[];
};

export type Option = {
  max?: number;
  min?: number;
  quantity?: number;
  name: string;
  id: string;
  points: number;
  type?: OptionType;
  mount_name?: string;
  passengers?: number;
  included?: boolean;
  dependencies?: OptionDependency[];
};

export type Unit = {
  model_id: string;
  army_type: ArmyType;
  army_list: string;
  profile_origin: string;
  name: string;
  unit_type: UnitType;
  base_points: number;
  unique?: boolean;
  siege_crew: number;
  MWFW: string[][];
  warband_size: number;
  options: Option[];
  opt_mandatory?: boolean;
  bow_limit?: boolean;
  default_bow?: boolean;
  default_throw?: boolean;
  inc_bow_count?: boolean;
  no_followers?: boolean;
  legacy?: boolean;
};

export type SiegeEquipment = Pick<
  Unit,
  "name" | "unit_type" | "base_points" | "model_id" | "profile_origin"
> & { id?: string; siege_role: "Attacker" | "Defender" };
