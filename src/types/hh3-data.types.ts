export type ArmyType = "Astartes" | "Mechanicum";

/**
 * TODO: regenerate this list after all data is loaded.
 */
export type UnitType =
  | "Crusade Primary Detachment"
  | "Apex Detachment Combat Retinue"
  | "Apex Detachment Officer Cadre"
  | "Apex Detachment Army Vanguard"
  | "Auxillary Detachment Armoured Fist"
  | "Auxillary Detachment Tactical Support"
  | "Auxillary Detachment Armoured Support"
  | "Auxillary Detachment Heavy Support"
  | "Auxillary Detachment Combat Pioneers"
  | "Auxillary Detachment Shock Assault"
  | "Auxillary Detachment First Strike"
  | "Warlord Detachment"
  | "Lord of War Detachment"
  | "Logistical Benefit"
  | "Apex Detachment"
  | "Auxillary Detachment"
  | "Apex Detachment Hammer of Olympia"
  | "Auxillary Detachment Ironfire Cohort"
  | "High Command"
  | "Command"
  | "Retinues"
  | "Elites"
  | "Heavy Assault"
  | "Troops"
  | "Support"
  | "War-Engines"
  | "Transports"
  | "Heavy Transports"
  | "Recon"
  | "Fast Attack"
  | "Armour"
  | "Lords of War"
  | "Warlord"  
  | string;

/**
 * TODO: regenerate this list after all data is loaded.
 */
type OptionType =
  | "extra"
  | "one-hand"
  | "two-hand"
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
  extra_points?: number;
  min_unit?: number;
  max_unit?: number;
  unique?: boolean;
  warband_size: number;
  options: Option[];
  opt_mandatory?: boolean;
}
