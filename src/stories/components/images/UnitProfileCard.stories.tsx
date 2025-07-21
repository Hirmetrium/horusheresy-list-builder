import Box from "@mui/material/Box";
import { StoryFn } from "@storybook/react";
import { UnitProfileCard } from "../../../components/common/images/UnitProfileCard.tsx";
import { UnitProfileProps } from "../../../components/common/images/UnitProfilePicture.tsx";

// Default export with title and component
export default {
  title: "Components/Images/UnitProfileCard",
  component: UnitProfileCard,
  decorators: [
    (Story) => (
      <Box sx={{ "& img": { maxWidth: "640px" }, maxWidth: "640px" }}>
        <Story />
        <center>
          <i>
            <small>Max with on the storybook container is set to 640px</small>
          </i>
        </center>
      </Box>
    ),
  ],
};

// Template for the MwfBadge story
const Template: StoryFn<Pick<UnitProfileProps, "army" | "profile">> = (
  args,
) => <UnitProfileCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  army: "Rohan",
  profile: "Theoden",
};

export const ImageNotFound = Template.bind({});
ImageNotFound.args = {
  army: "Rohan",
  profile: "Unknown name",
};
