import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import {
  OptionList,
  OptionListProps,
} from "../../../components/common/option/OptionList.tsx";
import { Option } from "../../../types/hh3-data.types.ts";

// Mock Data for Options
const mockOptions: Option[] = [
  {
    id: "opt1",
    name: "Banner",
    points: 25,
  },
  {
    id: "opt2",
    name: "Orc bow",
    points: 1,
    type: "bow",
  },
  {
    id: "opt3",
    name: "Shield and spear",
    quantity: 1,
    points: 2,
  },
  {
    id: "opt4",
    name: "Shield",
    points: 1,
  },
  {
    id: "opt5",
    name: "Spear",
    points: 1,
  },
];

export default {
  title: "Components/Options/OptionList",
  component: OptionList,
  argTypes: {
    onSelect: { action: "onSelect" }, // Log the onSelect action in Storybook
  },
} as Meta;

const Template: StoryFn<OptionListProps> = (args) => <OptionList {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: mockOptions
    .filter((option) => option.id !== "opt3")
    .map((option) => ({
      ...option,
      opt_quantity: ["Spear", "Shield"].includes(option.name) ? 1 : 0,
    })),
  variant: "multiple",
  onSelect: action("onSelect"),
};
Default.storyName = "Default (Multiple)";

export const Single = Template.bind({});
Single.args = {
  options: mockOptions,
  variant: "single",
  onSelect: action("onSelect"),
};

export const MandatorySingle = Template.bind({});
MandatorySingle.args = {
  options: mockOptions.map((option) => ({ ...option, opt_quantity: 0 })),
  variant: "single-mandatory",
  mandatory: false,
  onSelect: action("onSelect"),
};
