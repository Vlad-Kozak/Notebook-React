import { IconButton } from "./IconButton";
import "../../index.css";

export default {
  title: "IconButton",
  component: IconButton,
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: "rgb(0,0,0,0.5)",
          width: "100px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        {story()}
      </div>
    ),
  ],
};

const Template = (args) => <IconButton {...args} />;

export const Close = Template.bind({});
Close.args = {
  handleClick: () => {},
  type: "close",
};
export const Show = Template.bind({});
Show.args = {
  handleClick: () => {},
  type: "show",
};
export const Edit = Template.bind({});
Edit.args = {
  handleClick: () => {},
  type: "edit",
};
export const Archive = Template.bind({});
Archive.args = {
  handleClick: () => {},
  type: "archive",
};
export const Delete = Template.bind({});
Delete.args = {
  handleClick: () => {},
  type: "delete",
};
