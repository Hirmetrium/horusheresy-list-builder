import { useProfiles } from "./useProfiles.ts";

export const useUsedMagicalPowers = () => {
  try {
    const profiles = useProfiles();
    return profiles.profiles
      .flatMap((profile) => profile)
      .map((mp) => mp.name)
      .map((keyword) => keyword.replace(/\(.*?\)/g, "(X)"));
  } catch {
    return [];
  }
};
