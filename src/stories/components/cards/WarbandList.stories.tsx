import { Meta, StoryFn } from "@storybook/react";
import data from "../../../assets/data/hh3_data.json";
import {
  WarbandList as WarbandListComponent,
  WarbandListProps,
} from "../../../components/common/warbands/WarbandList.tsx";

const saruman = data["[muster-of-isengard] saruman"];
const captain = data["[muster-of-isengard] uruk-hai-captain"];
const warrior = data["[muster-of-isengard] uruk-hai-warrior"];

const general = {
  id: "hero-1",
  ...saruman,
  pointsTotal: saruman.base_points,
};
const hero = {
  id: "hero-2",
  ...captain,
  pointsTotal: captain.base_points,
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
];

export default {
  title: "Components/Cards/Warband/WarbandList",
  component: WarbandListComponent,
  argTypes: {
    warbands: { control: "object" },
  },
} as Meta;

const Template: StoryFn<WarbandListProps> = (args) => (
  <WarbandListComponent {...args} />
);

export const WarbandList = Template.bind({});
WarbandList.args = {
  warbands: [
    {
      id: "warband-1",
      hero: general,
      units: units,
      meta: {
        num: 1,
        points: units
          .map(({ pointsTotal }) => pointsTotal)
          .reduce((a, b) => a + b, general.pointsTotal),
        units: 10,
        maxUnits: general.warband_size,
        bows: 0,
      },
    },
    {
      id: "warband-2",
      hero: hero,
      units: [units[1]],
      meta: {
        num: 2,
        points: [units[1]]
          .map(({ pointsTotal }) => pointsTotal)
          .reduce((a, b) => a + b, hero.pointsTotal),
        units: 6,
        maxUnits: hero.warband_size,
        bows: 0,
      },
    },
  ],
};
