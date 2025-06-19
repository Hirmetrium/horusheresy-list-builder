export type Profile = {
  type?: string[];
  M: string;
  WS: string;
  BS: string;
  S: string;
  T: string;
  W: string;
  I: string;
  A: string;
  LD: string;
  CL: string;
  WP: string;
  IN: string;
  SAV: string;
  INV: string;
  wargear?: string[];
  traits?: string[];
  special_rules?: string[];
  additional_stats?: AdditionalStat[];
  additional_text?: string[];
};
type AdditionalStat = Profile & {
  name: string; // name is not part of the Hero, so we explicitly add it
};
