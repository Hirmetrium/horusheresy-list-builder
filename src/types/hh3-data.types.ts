export type ArmyType = "Astartes" | "Solar Auxilia";

/**
 * TODO: regenerate this list after all data is loaded.
 */
export type UnitType =
  | "Crusade"
  | "Allied"
  | "High Command"
  | "Command"
  | "Troops"
  | "Transports"
  | "Retinue"
  | "Elite"
  | "Shock Assault"
  | "Tank"
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
  warband_size: number;
  options: Option[];
  opt_mandatory?: boolean;
}
