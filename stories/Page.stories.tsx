import React, { useState } from "react";
import { Story, ComponentMeta, ComponentStory } from "@storybook/react";
import { SearchButton, Omnibox, OmniboxProps, SearchButtonProps } from "../src";
import sandwiches from "./mocks/sandwiches.json";
import searchengines from "./mocks/searchengines.json";

export default {
  title: "Example/Page",
  component: Omnibox,
} as ComponentMeta<typeof Omnibox>;

interface Option {
  name: string;
  url?: string;
  [key: string]: string;
}

// @ts-ignore
// https://stackoverflow.com/questions/59459943/typescript-react-how-do-you-pass-a-generic-to-a-react-componentpropstypeof-com
const Template: ComponentStory<typeof Omnibox> = (
  args: OmniboxProps<Option> & SearchButtonProps
) => {
  const [open, setOpen] = useState(args.open);
  const [query, setQuery] = useState<string>(args.query || "");
  const [value, setValue] = useState<any>();
  const hasLinks = args.options.some((opt) => opt.url);

  return (
    <>
      <SearchButton
        onClick={() => setOpen((prev) => !prev)}
        langCode={args.langCode}
        label={args.label}
      />
      <Omnibox
        {...args}
        open={open}
        onClose={() => {
          setOpen((prev) => !prev);
        }}
        query={query}
        onQueryChange={(newQuery) => {
          setQuery(newQuery);
        }}
        onChange={(_, value) => {
          if (!hasLinks) {
            setValue(value);
            setQuery("");
          }
        }}
        getOptionLabel={(option) => option.name}
        startContent={
          args.startContent ??
          (value && !hasLinks ? <>You picked {value?.name}</> : undefined)
        }
      />
    </>
  );
};

const sandwichOptions: Partial<OmniboxProps<Option>> = {
  options: sandwiches,
  suggestedSearchItems: [
    {
      id: "1",
      value: "Bacon, egg and cheese",
    },
    {
      id: "2",
      value: "Cheesesteak",
    },
    {
      id: "3",
      value: "Gyro",
    },
  ],
};

export const Closed = Template.bind({});
Closed.args = {
  ...sandwichOptions,
  open: false,
};

export const EmptyQueryStart = Template.bind({});
EmptyQueryStart.args = {
  ...sandwichOptions,
  open: true,
  startContent: <>Start content shown when query is empty.</>,
};

export const EmptyQueryShowAll = Template.bind({});
EmptyQueryShowAll.args = {
  ...sandwichOptions,
  open: true,
};

export const NoResultQuery = Template.bind({});
NoResultQuery.args = {
  ...sandwichOptions,
  open: true,
  query: "foobar",
};

export const ResultQuery = Template.bind({});
ResultQuery.args = {
  ...sandwichOptions,
  open: true,
  query: "Cheese",
};

const searchEngineOptions: Partial<OmniboxProps<Option>> = {
  options: searchengines,
  suggestedSearchItems: [
    {
      id: "1",
      value: "Google",
    },
    {
      id: "2",
      value: "Bing",
    },
    {
      id: "3",
      value: "Baidu",
    },
  ],
};

export const Links = Template.bind({});
Links.args = {
  ...searchEngineOptions,
  open: true,
  getOptionUrl: (opt) => opt.url,
};

export const Spanish: Story = Template.bind({});
Spanish.args = {
  ...searchEngineOptions,
  open: true,
  getOptionUrl: (opt) => opt.url,
  langCode: "es",
};

export const German: Story = Template.bind({});
German.args = {
  ...searchEngineOptions,
  open: true,
  getOptionUrl: (opt) => opt.url,
  langCode: "de",
};

export const French: Story = Template.bind({});
French.args = {
  ...searchEngineOptions,
  open: true,
  getOptionUrl: (opt) => opt.url,
  langCode: "fr",
};

export const Japanese: Story = Template.bind({});
Japanese.args = {
  ...searchEngineOptions,
  open: true,
  getOptionUrl: (opt) => opt.url,
  langCode: "ja",
};

export const CustomLabel: Story = Template.bind({});
CustomLabel.args = {
  ...searchEngineOptions,
  open: false,
  getOptionUrl: (opt) => opt.url,
  label: "Go to",
};
