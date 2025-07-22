import { StoryFn } from "@storybook/react";
import {
  UnitTypeLabel,
  UnitTypeLabelProps,
} from "../../../components/common/unit-type/UnitTypeLabel.tsx";

export default {
  title: "Components/Badges & Labels/UnitTypeLabel",
  component: UnitTypeLabel,
  argTypes: {
    unitType: {
      control: "string",
    },
  },
};

// Template for the MwfBadge story
const Template: StoryFn<UnitTypeLabelProps> = (args) => (
  <UnitTypeLabel {...args} />
);

export const HeroOfLegendLabel = Template.bind({});
HeroOfLegendLabel.args = {
  unitType: "Hero of Legend",
};

export const HeroOfValourLabel = Template.bind({});
HeroOfValourLabel.args = {
  unitType: "Hero of Valour",
};

export const IndependentHeroLabel = Template.bind({});
IndependentHeroLabel.args = {
  unitType: "Independent Hero",
};

export const SiegeEngineLabel = Template.bind({});
SiegeEngineLabel.args = {
  unitType: "Siege Engine",
};
