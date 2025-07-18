import { hh3Data, profileData } from "../../assets/data.ts";
import { Unit } from "../../types/hh3-data.types.ts";
import { Profile } from "../../types/profile-data.types.ts";
import {
  convertBardsFamilyToSingleRows,
  convertShankAndWrotToSingleRows,
  convertSharkeyAndWormToSingleRows,
} from "./utils/special-rows.ts";

const emptyProfile: Profile = {
  Mv: "",
  Fv: "",
  Sv: "",
  S: "",
  D: "",
  A: "",
  W: "",
  C: "",
  I: "",
  Range: "",
  special_rules: [],
  active_or_passive_rules: [],
  additional_stats: [],
  additional_text: [],
  heroic_actions: [],
  magic_powers: [],
  wargear: [],
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
    if (dataPoint[0].name === "Bard's Family") {
      return convertBardsFamilyToSingleRows(dataPoint);
    }
    if (dataPoint[0].name === "Shank & Wrot") {
      return convertShankAndWrotToSingleRows(dataPoint);
    }
    if (dataPoint[0].name === "Sharkey & Worm") {
      return convertSharkeyAndWormToSingleRows(dataPoint);
    }
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
      MWFW: dataPoint.flatMap((p) => p.MWFW),
      profile: profile,
    };
  })
  .map((row) => {
    const [M, W, F] =
      row.name === "The Witch-king of Angmar" || row.name === "Ringwraith"
        ? ["*", "*", "*"]
        : row.MWFW[0]
          ? row.MWFW[0][1].split(":")
          : ["-", "-", "-"];
    return {
      ...row,
      Mv: !Number.isNaN(parseInt(row.profile.Mv))
        ? parseInt(row.profile.Mv)
        : -1,
      M,
      W,
      F,
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
