import { Meta, StoryFn } from "@storybook/react";
import data from "../../../assets/data/hh3_data.json";
import {
  Warband,
  WarbandProps,
} from "../../../components/common/warbands/Warband.tsx";
import { Unit } from "../../../types/hh3-data.types.ts";

const theoden = data["[kingdom-of-rohan] theoden"];
const rider = data["[kingdom-of-rohan] rider-of-rohan"];
const warrior = data["[kingdom-of-rohan] warrior-of-rohan"];

const hero = {
  id: "hero",
  ...theoden,
  pointsTotal: theoden.base_points,
};
const units = [
  {
    id: "unit-1",
    ...warrior,
    quantity: 4,
    pointsPerUnit: warrior.base_points,
    pointsTotal: warrior.base_points * 4,
  },
  {
    id: "unit-2",
    ...warrior,
    quantity: 6,
    pointsPerUnit: warrior.base_points + 1,
    pointsTotal: (warrior.base_points + 1) * 6,
    options: warrior.options.map((o) =>
      o.name === "Shield" ? { ...o, quantity: 1 } : o,
    ),
  },
  {
    id: "unit-3",
    ...rider,
    quantity: 8,
    pointsPerUnit: rider.base_points,
    pointsTotal: rider.base_points * 8,
  },
];

export default {
  title: "Components/Cards/Warband/Warband",
  component: Warband,
  argTypes: {
    warband: { control: "object" },
  },
} as Meta;

const Template: StoryFn<WarbandProps> = (args) => <Warband {...args} />;

export const EmptyWarband = Template.bind({});
EmptyWarband.args = {
  warband: {
    id: "warband-id",
    hero: null,
    units: [],
    meta: {
      num: 1,
      points: 0,
      units: 0,
      maxUnits: "-",
      bows: 0,
    },
  },
};

export const WarbandWithHero = Template.bind({});
WarbandWithHero.args = {
  warband: {
    id: "warband-id",
    hero: hero,
    units: [],
    meta: {
      num: 1,
      points: hero.pointsTotal,
      units: 0,
      maxUnits: theoden.warband_size,
      bows: 0,
    },
  },
};

export const WarbandWithHeroAndUnits = Template.bind({});
WarbandWithHeroAndUnits.args = {
  warband: {
    id: "warband-id",
    hero: hero,
    units: units,
    meta: {
      num: 1,
      points: units
        .map(({ pointsTotal }) => pointsTotal)
        .reduce((a, b) => a + b, hero.pointsTotal),
      units: units.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0),
      maxUnits: theoden.warband_size,
      bows: units
        .filter((unit) => (unit as unknown as Unit).default_bow)
        .map(({ quantity }) => quantity)
        .reduce((a, b) => a + b, 0),
    },
  },
};

export const WarbandWithUnselectedUnit = Template.bind({});
WarbandWithUnselectedUnit.args = {
  warband: {
    id: "warband-id",
    hero: hero,
    units: [
      {
        id: "unit-1",
      },
    ],
    meta: {
      num: 1,
      points: hero.pointsTotal,
      units: 0,
      maxUnits: theoden.warband_size,
      bows: 0,
    },
  },
};
