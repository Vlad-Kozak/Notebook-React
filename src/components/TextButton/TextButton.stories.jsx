import { TextButton } from "./TextButton";
import "../../index.css";

export default {
  title: "TextButton",
  component: TextButton,
  argTypes: {
    children: {
      type: "string",
      description: "label",
      defaultValue: "Click me!",
    },
    handleClick: {
      type: "function",
    },
  },
};

const Template = (args) => <TextButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Click me!",
  handleClick: () => {},
};
