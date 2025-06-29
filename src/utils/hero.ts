import { SelectedUnit } from "../types/roster.ts";

export const isHeroWhoLeads = (hero: SelectedUnit): boolean => {
  if (hero.name === "Shank & Wrot") return false;
  if (hero.name === "Smaug") return false;

  return true;
};
