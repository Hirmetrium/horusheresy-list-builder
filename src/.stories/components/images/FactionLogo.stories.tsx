import { StoryFn } from "@storybook/react";
import {
  FactionLogo,
  FactionLogoProps,
} from "../../../components/common/images/FactionLogo.tsx";

// Default export with title and component
export default {
  title: "Components/Images/FactionLogo",
  component: FactionLogo,
};

// Template for the MwfBadge story
const Template: StoryFn<FactionLogoProps> = (args) => <FactionLogo {...args} />;

export const Default = Template.bind({});
Default.args = {
  faction: "Kingdom of Rohan",
  size: 100,
};

export const ImageNotFound = Template.bind({});
ImageNotFound.args = {
  faction: "Unknown name",
};
