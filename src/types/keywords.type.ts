// Here, we are setting up the profile as it is in HH3 (SR, traits, type and subtype), but also need detachment types for some of the detachment limitations
export type KeywordsType = {
  name: string;
  type: "special_rule" | "detachment" | "traits" | "type" | "sub-type" | "reaction" | "prime_advantage"; 
  description: string;
}[];
