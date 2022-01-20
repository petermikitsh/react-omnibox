import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SearchButton, Omnibox, OmniboxProps } from "../src";
import sandwiches from "./mocks/sandwiches.json";
import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { StyledEngineProvider } from "@mui/material";
import styled from "@emotion/styled";

export default {
  title: "Example/CustomElement",
  component: Omnibox,
} as ComponentMeta<typeof Omnibox>;

interface Option {
  name: string;
  url?: string;
  [key: string]: string;
}

// @ts-ignore
// https://stackoverflow.com/questions/59459943/typescript-react-how-do-you-pass-a-generic-to-a-react-componentpropstypeof-com
const Template: ComponentStory<Partial<typeof Omnibox>> = (
  args: OmniboxProps<Option>
) => {
  const [open, setOpen] = useState(args.open);
  const [query, setQuery] = useState<string>(args.query || "");
  const [value, setValue] = useState<any>();
  const hasLinks = args.options.some((opt) => opt.url);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{ __html: "* { font-family: Mulish; }" }}
      />
      <SearchButton onClick={() => setOpen((prev) => !prev)} />
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

/* Styles ordinarily set by MUI <CssBaseline /> component
 * but those styles target 'body', and we are trying to
 * keep component styles isolated in shadow DOM
 */
const BaseStyles = styled.div`
  font-family: Muli, Verdana, Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
`;

interface CustomElementInnerProps {
  emotionMount: HTMLDivElement;
}

const CustomElementInner = ({ emotionMount }: CustomElementInnerProps) => {
  const [emotionCache] = useState<EmotionCache>(() =>
    createCache({
      key: "omnibox-custom-element",
      prepend: true,
      container: emotionMount,
      speedy: false,
    })
  );

  return (
    <StyledEngineProvider>
      <CacheProvider value={emotionCache}>
        <BaseStyles>
          <Template
            // @ts-ignore
            open
            options={sandwiches}
            suggestedSearchItems={[
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
            ]}
          />
        </BaseStyles>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

window.customElements.define(
  "react-omnibox",
  class ReactOmnibox extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      const emotionMount = document.createElement("div");
      emotionMount.setAttribute("data-about", "emotion-mount");
      const mount = document.createElement("div");
      shadow.appendChild(emotionMount);
      shadow.appendChild(mount);
      ReactDOM.render(
        <CustomElementInner emotionMount={emotionMount} />,
        mount
      );
    }
  }
);

export const ShadowDOM = () => {
  // @ts-ignore
  return <react-omnibox />;
};
