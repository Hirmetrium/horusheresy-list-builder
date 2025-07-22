import { Meta, StoryFn } from "@storybook/react";
import {
  HeroSelectionList as HeroSelectionListComponent,
  HeroSelectionListProps,
} from "../../../components/common/unit-selection/HeroSelectionList.tsx";

export default {
  title: "Components/Unit selection/HeroSelectionList",
  component: HeroSelectionListComponent,
  argTypes: {
    armyList: { control: "text" },
    selectUnit: { action: "selectUnit" },
  },
} as Meta;

const Template: StoryFn<HeroSelectionListProps> = (args) => (
  <HeroSelectionListComponent {...args} />
);

export const HeroSelectionList = Template.bind({});
HeroSelectionList.args = {
  armyList: "Kingdom of Rohan",
};
