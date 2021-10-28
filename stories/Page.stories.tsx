import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Omnibox } from "../src";

export default {
  title: "Example/Page",
  component: Omnibox,
} as ComponentMeta<typeof Omnibox>;

const Template: ComponentStory<typeof Omnibox> = (args) => (
  <Omnibox {...args} />
);

export const Example = Template.bind({});
