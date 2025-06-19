export type ArmyListData = Record<
  string,
  {
    additional_rules: {
      description: string;
    }[];
    special_rules: {
      title: string;
      description: string;
    }[];
    rule_highlights: string[];
  }
>;
