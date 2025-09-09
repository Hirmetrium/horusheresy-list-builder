import { UnitType } from "./hh3-data.types";

export type DetachmentSlot = {
  slot: UnitType;
  count: number;
};

export type DetachmentTemplate = {
  [detachmentName: string]: DetachmentSlot[];
};

export const detachmentTemplates: DetachmentTemplate = {
  "Crusade": [
    { slot: "High Command", count: 1 },
    { slot: "Command", count: 3 },
    { slot: "Troops", count: 4 },
    { slot: "Transports", count: 4 },
  ],
  "Combat Retinue": [
    { slot: "Retinues", count: 3 }
  ],
  "Officer Cadre": [
    { slot: "Command", count: 2 }
  ],
  "Army Vanguard": [
    { slot: "Elites", count: 3 }
  ],
  "Armoured Fist": [
    { slot: "Transports", count: 4 },
    { slot: "Heavy Transports", count: 4 }
  ],
  "Tactical Support": [
    { slot: "Troops", count: 2 },
    { slot: "Support", count: 2 }
  ],
  "Armoured Support": [
    { slot: "Armour", count: 4 }
  ],
  "Heavy Support": [
    { slot: "War-Engines", count: 1 }
  ],
  "Combat Pioneer": [
    { slot: "Recon", count: 2 }
  ],
  "Shock Assault": [
    { slot: "Heavy Assault", count: 2 }
  ],
  "First Strike": [
    { slot: "Fast Attack", count: 2 }
  ],
  "Warlord Detachment": [
    { slot: "Warlord", count: 1 },
    { slot: "Retinues", count: 1 },
    { slot: "Heavy Transports", count: 1 }
  ],
   "Lord of War Detachment": [
    { slot: "Lords of War", count: 2 },
  ],
  "Allied Detachment": [
    { slot: "Command", count: 2 },
    { slot: "Troops", count: 4 },
  ],
  "Daemonic Manifestation": [
    { slot: "Heavy Assault", count: 3 }
  ],
  "Veteran Cadre": [
    { slot: "Retinues", count: 1 },
    { slot: "Elites", count: 1 },
    { slot: "Heavy Transports", count: 1 }
  ],
  "Apothecarion Delegation": [
    { slot: "Support", count: 6 }
  ],
  "Techmarine Covenant": [
    { slot: "Support", count: 6 }
  ],
  "Recon Demi-Company": [
    { slot: "Recon", count: 3 },
    { slot: "Fast Attack", count: 1 },
  ],
  "Storm Battery": [
    { slot: "Support", count: 2 },
    { slot: "Armour", count: 2 },
  ],
  "Planetfall Speartip": [
    { slot: "Retinues", count: 1 },
    { slot: "Elites", count: 2 },
  ],
  "Dreadnought Talon": [
    { slot: "War-Engines", count: 3 }
  ],
  "New Detachment 1": [
    { slot: "Retinues", count: 1 },
    { slot: "Heavy Assault", count: 2 }
  ],
  "New Detachment 2": [
    { slot: "Retinues", count: 1 },
    { slot: "Heavy Assault", count: 2 }
  ],
  "Ironwing Gauntlet": [
    { slot: "Heavy Transports", count: 2 },
    { slot: "Armour", count: 2 }
  ],
  "Dreadwing Cadre": [
    { slot: "Support", count: 3 }
  ],
  "Stormwing Muster": [
    { slot: "Troops", count: 2 },
    { slot: "Transports", count: 2 }
  ],
  "Deathwing Conclave": [
    { slot: "Retinues", count: 1 },
    { slot: "Elites", count: 1 },
    { slot: "Heavy Assault", count: 1 }
  ],
  "Ravenwing Lance": [
    { slot: "Fast Attack", count: 2 },
    { slot: "Recon", count: 2 }
  ],
  "Firewing Echelon": [
    { slot: "Recon", count: 2 },
    { slot: "Elites", count: 2 }
  ],
  "Primacy Wing": [
    { slot: "Retinues", count: 1 },
    { slot: "Elites", count: 1 },
    { slot: "Fast Attack", count: 2 }
  ],
  "Brotherhood of the Phoenix": [
    { slot: "Warlord", count: 1 },
    { slot: "High Command", count: 3 },
    { slot: "Command", count: 1 }
  ],
  "The Hammer of Olympia": [
    { slot: "Heavy Assault", count: 2 },
    { slot: "Heavy Transports", count: 1 },
    { slot: "Troops", count: 2 },
  ],
  "The Ironfire Cohort": [
    { slot: "Armour", count: 2 },
    { slot: "Support", count: 2 }
  ],
  "Chogorian Warband": [
    { slot: "Fast Attack", count: 2 },
    { slot: "Recon", count: 2 }
  ],
  "Bloodied Claw": [
    { slot: "Troops", count: 2 },
    { slot: "Heavy Assault", count: 2 }
  ],
  "Siege Gauntlet": [
    { slot: "Troops", count: 2 },
    { slot: "Heavy Assault", count: 1 },
    { slot: "Support", count: 1 }
  ],
  "Terror Assault": [
    { slot: "Troops", count: 2 },
    { slot: "Fast Attack", count: 2 }
  ],
  "Atramentar Hunt": [
    { slot: "Retinues", count: 1 },
    { slot: "Heavy Assault", count: 2 }
  ],
  "Revelation Host": [
    { slot: "Troops", count: 2 },
    { slot: "Elites", count: 2 }
  ],
  "Spearhead Phalanx": [
    { slot: "Heavy Transports", count: 1 },
    { slot: "Armour", count: 1 },
    { slot: "Heavy Assault", count: 1 }
  ],
  "Medusan Vanguard": [
    { slot: "Command", count: 1 },
    { slot: "Heavy Assault", count: 2 },
    { slot: "Support", count: 1 },
    { slot: "War-Engines", count: 1 }
  ],
  "Berserker Cadre": [
    { slot: "Troops", count: 1 },
    { slot: "Heavy Assault", count: 2 },
    { slot: "Elites", count: 1 }
  ],
  "Sons of Bodt": [
    { slot: "Support", count: 2 },
    { slot: "Troops", count: 3 }
  ],
  "Primus Demi-Company": [
    { slot: "Command", count: 1 },
    { slot: "Troops", count: 2 },
    { slot: "Support", count: 1 },
    { slot: "Fast Attack", count: 1 }
  ],
  "Reaping Host": [
    { slot: "Troops", count: 2 },
    { slot: "Support", count: 1 },
    { slot: "Heavy Assault", count: 1 }
  ],
  "Prosperine Convocation": [
    { slot: "Troops", count: 1 },
    { slot: "Fast Attack", count: 1 },
    { slot: "Elites", count: 1 },
    { slot: "Heavy Transports", count: 1 }
  ],
  "Supremacy Cadre": [
    { slot: "Troops", count: 2 },
    { slot: "Heavy Assault", count: 1 },
    { slot: "Elites", count: 1 }
  ],
  "Exalted Conclave": [
    { slot: "Troops", count: 2 },
    { slot: "Elites", count: 2 }
  ],
  "Immolation Covenant": [
    { slot: "Support", count: 2 },
    { slot: "Armour", count: 2 }
  ],
  "Decapitation Cadre": [
    { slot: "Recon", count: 2 },
    { slot: "Elites", count: 2 }
  ],
  "Headhunter Leviathal": [
    { slot: "Recon", count: 2 },
    { slot: "Elites", count: 2 }
  ],
  "Veletaris Tercio": [
    { slot: "Elites", count: 2 },
    { slot: "Support", count: 1 },
    { slot: "Heavy Transports", count: 2 }
  ],
  "Infantry Tercio": [
    { slot: "Troops", count: 2 },
    { slot: "Recon", count: 1 },
    { slot: "Heavy Transports", count: 2 }
  ],
  "Artillery Tercio": [
    { slot: "Support", count: 3 }    
  ],
  "Scout Tercio": [
    { slot: "Recon", count: 2 },   
    { slot: "War-Engines", count: 1 }    
  ],
  "Armour Tercio": [
      { slot: "Armour", count: 3 }
  ],
  "Iron Tercio": [
    { slot: "Heavy Assault", count: 1 },
    { slot: "Troops", count: 1 },
    { slot: "Support", count: 1 }
  ],
  "Taghmata Cohort": [
    { slot: "Support", count: 4 }    
  ],
  "Apprentice Cadre": [
    { slot: "Troops", count: 4 }    
  ],
  "The Heart of Power": [
    { slot: "Retinues", count: 3 },   
    { slot: "Troops", count: 3 }    
  ],
  "Command Maniple": [
    { slot: "Elites", count: 1 },
    { slot: "Support", count: 1 },
    { slot: "War-Engines", count: 1 }
  ],
  "The Panoply of Cruelty": [
    { slot: "Heavy Assault", count: 3 }
  ],
  "Iron Phalanx": [
    { slot: "Armour", count: 3 },   
    { slot: "Heavy Transports", count: 3 }    
  ],
  "Crux of Judgement": [
    { slot: "Command", count: 3 }    
  ],
  "The Host of Destruction": [
    { slot: "Elites", count: 4 }    
  ],
  "Thallax Command Cohort": [
    { slot: "Support", count: 3 }
  ],
  "Knight Households": [
    { slot: "Lords of War", count: 4 }
  ],
  "Armiger Talon": [
    { slot: "War-Engines", count: 4 }
  ],
  "Support Banner": [
    { slot: "Lords of War", count: 2 }
  ],
  "Automata Talon": [
    { slot: "Elites", count: 1 },
    { slot: "Support", count: 1 },
    { slot: "Recon", count: 1 },
    { slot: "Fast Attack", count: 1 }
  ],
  "Yeomanry Mesnie": [
    { slot: "Troops", count: 2 },
    { slot: "Elites", count: 1 },
    { slot: "Recon", count: 1 },
    { slot: "Heavy Transports", count: 2 }
  ],
  "Titan Ordinal": [
    { slot: "Lords of War", count: 1 },
    { slot: "Command", count: 1 },
    { slot: "Troops", count: 4 },
    { slot: "Transports", count: 4 }
  ],
};