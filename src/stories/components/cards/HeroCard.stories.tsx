import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import data from "../../../assets/data/hh3_data.json";
import {
  HeroCard,
  HeroCardProps,
} from "../../../components/common/card/HeroCard.tsx";
import { Unit } from "../../../types/hh3-data.types.ts";

const units = Object.values(data).filter(({ unit_type }) =>
  unit_type.includes("Hero"),
);
const mockUnit: Unit = units[
  Math.floor(Math.random() * units.length)
] as unknown as Unit;

export default {
  title: "Components/Cards/HeroCard",
  component: HeroCard,
  argTypes: {
    unit: { control: "object" },
    collapsed: { control: "boolean" },
    updateUnit: { action: "updateUnit" },
    openProfileCard: { action: "openProfileCard" },
    reselect: { action: "reselect" },
    remove: { action: "remove" },
  },
} as Meta;

const Template: StoryFn<HeroCardProps> = (args) => <HeroCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  collapsed: false,
  isLeader: false,
  toggleLeader: action("toggleLeader"),
  unit: {
    ...mockUnit,
    quantity: 1,
    pointsPerUnit: mockUnit.base_points,
    pointsTotal: mockUnit.base_points,
  },
};

export const ArmyLeader = Template.bind({});
ArmyLeader.args = {
  collapsed: false,
  isLeader: true,
  toggleLeader: action("toggleLeader"),
  unit: {
    ...mockUnit,
    quantity: 1,
    pointsPerUnit: mockUnit.base_points,
    pointsTotal: mockUnit.base_points,
  },
};

export const WithoutLeaderToggle = Template.bind({});
WithoutLeaderToggle.args = {
  collapsed: false,
  isLeader: false,
  unit: {
    ...mockUnit,
    quantity: 1,
    pointsPerUnit: mockUnit.base_points,
    pointsTotal: mockUnit.base_points,
  },
};
