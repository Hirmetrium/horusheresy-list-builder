import { Meta, StoryFn } from "@storybook/react";
import data from "../../../assets/data/hh3_data.json";
import {
  WarriorCard,
  WarriorCardProps,
} from "../../../components/common/card/WarriorCard.tsx";

const units = Object.values(data).filter(
  ({ unit_type }) => unit_type === "Warrior",
);
const mockUnit = units[Math.floor(Math.random() * units.length)];

export default {
  title: "Components/Cards/WarriorCard",
  component: WarriorCard,
  argTypes: {
    unit: { control: "object" },
    collapsed: { control: "boolean" },
    updateUnit: { action: "updateUnit" },
    openProfileCard: { action: "openProfileCard" },
    duplicate: { action: "duplicate" },
    reselect: { action: "reselect" },
    remove: { action: "remove" },
  },
} as Meta;

const Template: StoryFn<WarriorCardProps> = (args) => <WarriorCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  collapsed: false,
  unit: {
    ...mockUnit,
    quantity: 5,
    pointsPerUnit: mockUnit.base_points,
    pointsTotal: mockUnit.base_points * 5,
  },
};
