import { StoryFn } from "@storybook/react";
import {
  UnitProfilePicture,
  UnitProfileProps,
} from "../../../components/common/images/UnitProfilePicture.tsx";

// Default export with title and component
export default {
  title: "Components/Images/UnitProfilePicture",
  component: UnitProfilePicture,
};

// Template for the MwfBadge story
const Template: StoryFn<UnitProfileProps> = (args) => (
  <UnitProfilePicture {...args} />
);

export const Default = Template.bind({});
Default.args = {
  army: "Rohan",
  profile: "Theoden",
  size: "normal",
  opacity: 100,
};

export const LowerOpacity = Template.bind({});
LowerOpacity.args = {
  army: "Rohan",
  profile: "Eowyn",
  size: "normal",
  opacity: 55,
};

export const ImageNotFound = Template.bind({});
ImageNotFound.args = {
  army: "Rohan",
  profile: "Unknown name",
  size: "normal",
  opacity: 100,
};
