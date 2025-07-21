import { Meta, StoryFn } from "@storybook/react";
import {
  UnitSelectionButton,
  UnitSelectionButtonProps,
} from "../../../components/common/unit-selection/UnitSelectionButton.tsx";

export default {
  title: "Components/Unit selection/UnitSelectionButton",
  component: UnitSelectionButton,
  argTypes: {
    unit: { control: "object" },
    onClick: { action: "onClick" },
  },
} as Meta;

const Template: StoryFn<UnitSelectionButtonProps> = (args) => (
  <UnitSelectionButton {...args} />
);

export const Hero = Template.bind({});
Hero.args = {
  unit: {
    faction: "Rohan",
    name: "Theoden",
    profile_origin: "Rohan",
    base_points: 75,
    MWFW: [["", "3:2:2:1"]],
    unit_type: "Hero of Legend",
  },
};

export const Warrior = Template.bind({});
Warrior.args = {
  unit: {
    faction: "Isengard",
    name: "Uruk-Hai Warrior",
    profile_origin: "Isengard",
    base_points: 75,
    MWFW: [],
    unit_type: "Warrior",
  },
};

export const SiegeEngine = Template.bind({});
SiegeEngine.args = {
  unit: {
    faction: "Isengard",
    name: "Isengard Assault Ballista",
    profile_origin: "Isengard",
    base_points: 65,
    MWFW: [],
    unit_type: "Siege Engine",
  },
};
