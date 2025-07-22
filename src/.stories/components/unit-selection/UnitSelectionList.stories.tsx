import { Meta, StoryFn } from "@storybook/react";
import {
  UnitSelectionList as UnitSelectionListComponent,
  UnitSelectionListProps,
} from "../../../components/common/unit-selection/UnitSelectionList.tsx";

export default {
  title: "Components/Unit selection/UnitSelectionList",
  component: UnitSelectionListComponent,
  argTypes: {
    leadingHeroModelId: { control: "text" },
    selectUnit: { action: "selectUnit" },
  },
} as Meta;

const Template: StoryFn<UnitSelectionListProps> = (args) => (
  <UnitSelectionListComponent {...args} />
);

export const UnitSelectionList = Template.bind({});
UnitSelectionList.args = {
  leadingHeroModelId: "[kingdom-of-rohan] theoden",
};
