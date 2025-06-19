export type Profile = {
  M: string; // move
  WS: string; // weapon skill
  BS: string; // ballistic skill
  S: string; // strength
  T: string; // toughness
  W: string; // wounds
  I: string; // initiative
  A: string; // attacks
  LD: string; // advanced characteristic - leadership
  CL: string; // advanced characteristic - cool
  WP: string; // advanced characteristic - willpower
  IN: string; // advanced characteristic - intelligence
  SAV: string; // save
  INV: string; // invun save
  wargear?: string[]; // pull from profile
  special_rules?: string[]; // should pull from main list, but specific variants might be harder to code?
  traits?: string[]; // Renamed to traits to account for new profile layout in 3.0
  type?: string[]; // adding unit types
  additional_stats?: AdditionalStat[]; // Optional field to account for the presence of additional stats
  additional_text?: string[]; // Optional field for additional text
};
type AdditionalStat = Profile & {
  name: string; // name is not part of the Hero, so we explicitly add it
};
