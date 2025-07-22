import { profileData } from "../../../assets/data.ts";
import { Unit } from "../../../types/hh3-data.types.ts";

export const COMPOSED_UNIT_MAP = {
  "Bain, Son of Bard": "Bard's Family",
  Tilda: "Bard's Family",
  Sigrid: "Bard's Family",
  Shank: "Shank & Wrot",
  Wrot: "Shank & Wrot",
  "Snow Troll": "Shank & Wrot",
};

export function convertBardsFamilyToSingleRows(dataPoint: Unit[]) {
  const base = {
    army_type: dataPoint[0].army_type,
    profile_origin: dataPoint[0].profile_origin,
    unit_type: [...new Set(dataPoint.map((p) => p.unit_type))],
    army_list: dataPoint.map((p) => p.army_list),
    option_mandatory: dataPoint[0].opt_mandatory,
    options: dataPoint
      .flatMap((p) => p.options)
      .filter((o, i, s) => s.findIndex((ot) => ot.name === o.name) === i),
  };
  return [
    {
      ...base,
      name: `Bain, Son of Bard`,
      profile: profileData[dataPoint[0].profile_origin][
        dataPoint[0].name
      ].additional_stats.find((stat) => stat.name === "Bain, Son of Bard"),
    },
    {
      ...base,
      name: `Sigrid`,
      profile: profileData[dataPoint[0].profile_origin][
        dataPoint[0].name
      ].additional_stats.find((stat) => stat.name === "Sigrid"),
    },
    {
      ...base,
      name: `Tilda`,
      profile: profileData[dataPoint[0].profile_origin][
        dataPoint[0].name
      ].additional_stats.find((stat) => stat.name === "Tilda"),
    },
  ];
}

export function convertShankAndWrotToSingleRows(dataPoint: Unit[]) {
  const base = {
    army_type: dataPoint[0].army_type,
    profile_origin: dataPoint[0].profile_origin,
    unit_type: [...new Set(dataPoint.map((p) => p.unit_type))],
    army_list: dataPoint.map((p) => p.army_list),
    option_mandatory: dataPoint[0].opt_mandatory,
    options: dataPoint
      .flatMap((p) => p.options)
      .filter((o, i, s) => s.findIndex((ot) => ot.name === o.name) === i),
  };

  return [
    {
      ...base,
      name: `Shank`,
      profile: profileData[dataPoint[0].profile_origin][
        dataPoint[0].name
      ].additional_stats.find((stat) => stat.name === "Shank"),
    },
    {
      ...base,
      name: `Wrot`,
      profile: profileData[dataPoint[0].profile_origin][
        dataPoint[0].name
      ].additional_stats.find((stat) => stat.name === "Wrot"),
    },
    {
      ...base,
      name: `Snow Troll`,
      profile: profileData[dataPoint[0].profile_origin][
        dataPoint[0].name
      ].additional_stats.find((stat) => stat.name === "Snow Troll"),
    },
  ];
}

export function convertSharkeyAndWormToSingleRows(dataPoint: Unit[]) {
  const base = {
    army_type: dataPoint[0].army_type,
    profile_origin: dataPoint[0].profile_origin,
    unit_type: [...new Set(dataPoint.map((p) => p.unit_type))],
    army_list: dataPoint.map((p) => p.army_list),
    option_mandatory: dataPoint[0].opt_mandatory,
    options: dataPoint
      .flatMap((p) => p.options)
      .filter((o, i, s) => s.findIndex((ot) => ot.name === o.name) === i),
  };

  return [
    {
      ...base,
      name: `Sharkey`,
      profile: profileData[dataPoint[0].profile_origin][
        dataPoint[0].name
      ].additional_stats.find((stat) => stat.name === "Sharkey"),
    },
    {
      ...base,
      name: `Worm`,
      profile: profileData[dataPoint[0].profile_origin][
        dataPoint[0].name
      ].additional_stats.find((stat) => stat.name === "Worm"),
    },
  ];
}
