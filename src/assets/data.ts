import { ArmyListData } from "../types/army-list-data.types.ts";
import { HeroConstraintsDataType } from "../types/hero-constraints-data.type.ts";
import { Unit } from "../types/hh3-data.types.ts";
import { KeywordsType } from "../types/keywords.type.ts";
import { Profile } from "../types/profile-data.types.ts";
import { WarningRules } from "../types/warning-rules.types.ts";
import armyListDataRaw from "./data/army_list_data.json";
import heroConstraintDataRaw from "./data/hero_constraint_data.json";
import hh3DataRaw from "./data/hh3_data.json";
import keywordsRaw from "./data/keywords.json";
import profileDataRaw from "./data/profile_data.json";
import warningRulesRaw from "./data/warning_rules.json";

export const armyListData: ArmyListData = armyListDataRaw;
export const heroConstraintData: HeroConstraintsDataType =  heroConstraintDataRaw;
export const keywords: KeywordsType = keywordsRaw as KeywordsType;
export const hh3Data: Record<string, Unit> = hh3DataRaw as Record<string, Unit>;
export const profileData: Record<string, Record<string, Profile>> = profileDataRaw as Record<string, Record<string, Profile>>;
export const warningRulesData: WarningRules = warningRulesRaw as WarningRules;
