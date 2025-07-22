import { StoryFn } from "@storybook/react"; // Adjust the path based on your project structure
import {
  OptionItem,
  OptionItemProps,
} from "../../../components/common/option/OptionItem.tsx";
import { Option } from "../../../types/hh3-data.types.ts";

// Mock data for `Option` object
const optionData: Option = {
  name: "Armoured horse",
  points: 10,
  type: "mount",
} as Option;

// Default export with title and component
export default {
  title: "Components/Options/OptionItem",
  component: OptionItem,
  argTypes: {
    option: { control: "object" },
    selectable: { control: "boolean" },
    onSelect: { action: "selected" },
  },
};

// Template for OptionItem story
const Template: StoryFn<OptionItemProps> = (args) => <OptionItem {...args} />;

// Story with a Checkbox variant
export const Default = Template.bind({});
Default.args = {
  option: optionData,
  selectable: true,
};

// Story with a Radio variant
export const Selected = Template.bind({});
Selected.args = {
  option: { ...optionData, opt_quantity: 1 },
  selectable: true,
};

// Story with a disabled variant
export const Disabled = Template.bind({});
Disabled.args = {
  option: optionData,
  selectable: false,
};
