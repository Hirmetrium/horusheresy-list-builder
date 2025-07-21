import { StoryFn } from "@storybook/react";
import { MwfBadge } from "../../../components/common/might-will-fate/MwfBadge.tsx";
import { Unit } from "../../../types/hh3-data.types.ts";

// Mock data for `unit`
const unitData = {
  name: "Storybook Unit",
  MWFW: [
    [
      "Storybook Unit",
      "3:2:2:2", // Example MWFW values: might, will, fate
    ],
  ],
};

// Default export with title and component
export default {
  title: "Components/Badges & Labels/MwfBadge",
  component: MwfBadge,
  argTypes: {
    unit: {
      control: "object", // Allow the `unit` prop to be passed dynamically in the Storybook UI
    },
  },
};

// Template for the MwfBadge story
const Template: StoryFn<{ unit: Unit }> = (args) => <MwfBadge {...args} />;

// Story using the default unit data
export const UnitWithMWF = Template.bind({});
UnitWithMWF.args = {
  unit: unitData, // Pass the mock unit data as the prop
};

// Story without MWFW in unit data
export const UnitWithoutMWF = Template.bind({});
UnitWithoutMWF.args = {
  unit: { ...unitData, MWFW: [] }, // Pass the mock unit data as the prop
};

// Story with MWFW in unit data, but all values 0
export const UnitWithZeroMWF = Template.bind({});
UnitWithZeroMWF.args = {
  unit: { ...unitData, MWFW: [["Storybook Unit", "0:0:0:0"]] }, // Pass the mock unit data as the prop
};
