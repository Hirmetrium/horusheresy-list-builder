export type Profile = {
  unit_type?: string;
  name: string;

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
  type?: string[];

  additional_stats?: Profile[];
  additional_text?: string[];
};
