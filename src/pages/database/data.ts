import { hh3Data, profileData } from "../../assets/data.ts";
import { Unit } from "../../types/hh3-data.types.ts";
import { Profile } from "../../types/profile-data.types.ts";

const emptyProfile: Profile = {
  M: "",
  WS: "",
  BS: "",
  S: "",
  T: "",
  W: "",
  I: "",
  A: "",
  LD: "",
  CL: "",
  WP: "",
  IN: "",
  SAV: "",
  INV: "",
  wargear: [],
  special_rules: [],
  additional_stats: [],
  additional_text: [],
};

const getProfileData = ([{ profile_origin, name }]: Unit[]) => {
  const profiles = profileData[profile_origin];
  if (!profiles) return emptyProfile;
  const profile = profiles[name];
  if (!profile) return emptyProfile;
  return profile;
};

export const rows = Object.values(
  Object.values(hh3Data).reduce((acc, currentValue) => {
    const name = `${currentValue.name}-${currentValue.profile_origin}`;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(currentValue);

    return acc;
  }, {}),
)
  .flatMap((dataPoint: Unit[]) => {
    const profile = getProfileData(dataPoint);
    return {
      name: dataPoint[0].name,
      army_type: dataPoint[0].army_type,
      profile_origin: dataPoint[0].profile_origin,
      unit_type: [...new Set(dataPoint.map((p) => p.unit_type))],
      army_list: dataPoint.map((p) => p.army_list),
      option_mandatory: dataPoint[0].opt_mandatory,
      options: dataPoint
        .flatMap((p) => p.options)
        .filter((o, i, s) => s.findIndex((ot) => ot.name === o.name) === i),
      profile: profile,
    };
  })
  .map((row) => {
    return {
      ...row,
      M: !Number.isNaN(parseInt(row.profile.M))
        ? parseInt(row.profile.M)
        : -1,
      searchString: [
        row.name,
        row.profile_origin,
        row.army_list.join(","),
        row.profile.special_rules.join(","),
        row.profile.wargear.join(","),
      ]
        .join(",")
        .toLowerCase(),
    };
  });
