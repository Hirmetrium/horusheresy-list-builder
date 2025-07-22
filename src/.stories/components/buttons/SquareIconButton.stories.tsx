import {
  AddOutlined,
  Cancel,
  ContentCopyOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import {
  SquareIconButton as SquareIconButtonComponent,
  SquareIconButtonProps,
} from "../../../components/common/icon-button/SquareIconButton.tsx";

// Default export with title and component
export default {
  title: "Components/Buttons/SquareIconButton",
  component: SquareIconButtonComponent,
  argTypes: {
    disabled: { control: "boolean" },
    iconSize: { control: "text" },
    iconPadding: { control: "text" },
    iconColor: { control: "text" },
    backgroundColor: { control: "text" },
    backgroundColorHover: { control: "text" },
    onClick: { action: "onClick" },
    icon: { control: "object" },
  },
};

// Template for the MwfBadge story
const Template: StoryFn<SquareIconButtonProps> = (args) => (
  <SquareIconButtonComponent {...args} />
);

export const ProfileCardIconButton = Template.bind({});
ProfileCardIconButton.args = {
  disabled: false,
  iconSize: undefined,
  iconPadding: undefined,
  iconColor: "#DDD",
  backgroundColor: "#333",
  backgroundColorHover: undefined,
  onClick: action("onClick"),
  icon: <BsFillPersonVcardFill />,
};

export const AddIconButton = Template.bind({});
AddIconButton.args = {
  disabled: false,
  iconSize: undefined,
  iconPadding: "1",
  iconColor: "#DDD",
  backgroundColor: "rgb(25, 118, 210)",
  backgroundColorHover: undefined,
  onClick: action("onClick"),
  icon: <AddOutlined sx={{ fontSize: "1.5rem" }} />,
};

export const RemoveIconButton = Template.bind({});
RemoveIconButton.args = {
  disabled: false,
  iconSize: undefined,
  iconPadding: "1",
  iconColor: "#DDD",
  backgroundColor: "rgb(25, 118, 210)",
  backgroundColorHover: undefined,
  onClick: action("onClick"),
  icon: <RemoveOutlined sx={{ fontSize: "1.5rem" }} />,
};

export const DuplicateIconButton = Template.bind({});
DuplicateIconButton.args = {
  disabled: false,
  iconSize: undefined,
  iconPadding: "1",
  iconColor: "#DDD",
  backgroundColor: "rgb(25,176,210)",
  backgroundColorHover: undefined,
  onClick: action("onClick"),
  icon: <ContentCopyOutlined sx={{ fontSize: "1.5rem" }} />,
};

export const DeleteIconButton = Template.bind({});
DeleteIconButton.args = {
  disabled: false,
  iconSize: undefined,
  iconPadding: "1",
  iconColor: "#DDD",
  backgroundColor: "rgb(220,16,21)",
  backgroundColorHover: undefined,
  onClick: action("onClick"),
  icon: <Cancel sx={{ fontSize: "1.5rem" }} />,
};
