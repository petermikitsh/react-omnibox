import React, { useEffect, useRef } from "react";
import {
  Box,
  Dialog,
  DialogProps,
  DialogTitle,
  TextField,
  Typography,
  Autocomplete,
  ListItem,
  ListItemIcon,
  AutocompleteProps,
  createFilterOptions,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { SearchIcon, NoResultsIcon } from "./icons";
import { useHotkeys } from "react-hotkeys-hook";
import { SearchHitPageIcon, SearchHitSelectIcon } from "./icons";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { omniboxTheme } from "./theme";
import { Search } from "@mui/icons-material";
import { langCode, getTranslation } from "./i18n";
export interface SuggestedSearchItem {
  id: string;
  value: string;
}

const theme = createTheme(omniboxTheme);
export interface OmniboxProps<T>
  extends Pick<DialogProps, "open" | "onClose">,
    Required<
      Pick<
        AutocompleteProps<T, false, false, any, any>,
        "options" | "onChange" | "getOptionLabel"
      >
    > {
  query?: string;
  onQueryChange(newQuery: string): void;
  suggestedSearchItems: SuggestedSearchItem[];
  startContent?: React.ReactNode;
  getOptionUrl?: (option: T) => string | undefined;
  langCode?: langCode;
}

export const Omnibox = <T,>({
  getOptionLabel,
  getOptionUrl,
  open,
  onChange,
  onClose,
  options,
  query,
  onQueryChange,
  suggestedSearchItems,
  startContent = null,
  langCode,
}: OmniboxProps<T>) => {
  const noQuery = query === "";
  const textField = useRef<HTMLInputElement>();

  useHotkeys("command+k, ctrl+k", () => {}, {
    filter: (e) => {
      // fix: Chrome on Windows will focus the address bar
      e.preventDefault();
      onClose?.(e, "escapeKeyDown");
      return true;
    },
  });

  useEffect(() => {
    if (open) {
      textField.current?.focus();
    }
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dialog
        disablePortal
        maxWidth="lg"
        open={open}
        onClose={onClose}
        sx={{ background: "none" }}
        PaperProps={{
          sx: {
            backgroundImage: "none",
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            width: "500px",
            minHeight: "400px",
            overflowY: "auto",
            "& .MuiAutocomplete-listbox": {
              maxHeight: "inherit",
            },
          },
        }}
        TransitionProps={{
          onExited: () => {
            onQueryChange("");
          },
        }}
      >
        <Autocomplete
          open
          autoHighlight
          clearOnBlur={false}
          disablePortal
          onClose={(event, reason) => {
            if (reason === "escape") {
              onClose?.(event, "escapeKeyDown");
            }
          }}
          PaperComponent={({ children }) => <>{children}</>}
          PopperComponent={({ children }) => <>{children}</>}
          inputValue={query}
          onChange={(...args) => {
            const [, value] = args;

            if (value && getOptionUrl) {
              const url = getOptionUrl(value);
              if (url) {
                return (window.location.href = url);
              }
            }

            return onChange?.(...args);
          }}
          options={noQuery && startContent ? [] : options}
          sx={{
            "& .MuiAutocomplete-noOptions": {
              padding: "0",
            },
          }}
          renderInput={(params) => (
            <DialogTitle
              sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <SearchIcon
                    style={{
                      color: (theme.palette as any).primaryDark.main,
                      marginRight: "24px",
                    }}
                  />
                  <TextField
                    inputRef={textField}
                    variant="standard"
                    placeholder={getTranslation("search", langCode)}
                    value={query}
                    onChange={(e) => {
                      onQueryChange(e.target.value);
                    }}
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      sx: { fontSize: "19px" },
                      endAdornment: undefined,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    color: theme.palette.text.secondary,
                    fontFamily: "arial",
                    fontSize: "12px",
                    lineHeight: "14px",
                    borderRadius: theme.spacing(0.5),
                    fontWeight: 700,
                    padding: "3px 8px 6px",
                  }}
                >
                  esc
                </Box>
              </Box>
            </DialogTitle>
          )}
          filterOptions={createFilterOptions({
            stringify: getOptionLabel,
          })}
          getOptionLabel={getOptionLabel}
          ListboxProps={{ style: { maxHeight: "400px", position: "relative" } }}
          renderOption={(props, option) => {
            const matches = match(getOptionLabel(option), `${query}`, {
              insideWords: true,
            });
            const parts = parse(getOptionLabel(option), matches);
            const href = getOptionUrl?.(option);

            return (
              <ListItem
                {...props}
                {...(href && {
                  href,
                  component: "a",
                })}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  height: theme.spacing(7),
                  border: "1px solid transparent",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.spacing(1),
                  "&&.Mui-focused": {
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.primary.light,
                    border: `1px solid ${theme.palette.primary.light}`,
                  },
                  "&.Mui-focused .OmniboxMatch": {
                    textDecoration: "underline",
                  },
                  "&:not(.Mui-focused) .OmniboxMatch": {
                    color: theme.palette.primary.light,
                  },
                  "&:not(.Mui-focused) .SearchHitIcon": {
                    display: "none",
                  },
                }}
                secondaryAction={
                  <Box className="SearchHitIcon" sx={{ display: "flex" }}>
                    <SearchHitSelectIcon />
                  </Box>
                }
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <SearchHitPageIcon />
                </ListItemIcon>
                <Typography variant="body2">
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      className={part.highlight ? "OmniboxMatch" : ""}
                      sx={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </Box>
                  ))}
                </Typography>
              </ListItem>
            );
          }}
          noOptionsText={
            noQuery && startContent ? (
              startContent
            ) : (
              <Box
                sx={{
                  padding: `${theme.spacing(4.5)} 0`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ paddingBottom: theme.spacing(1.5) }}>
                  <NoResultsIcon
                    height="40"
                    width="40"
                    style={{
                      color: theme.palette.text.secondary,
                    }}
                  />
                </Box>
                <Typography color="">
                  No results for "<strong>{query}</strong>"
                </Typography>
                <Box sx={{ color: theme.palette.text.secondary }}>
                  <Typography variant="caption">Try searching for:</Typography>
                </Box>
                <Box
                  component="ul"
                  sx={{
                    padding: 0,
                    listStyleType: "none",
                  }}
                >
                  {suggestedSearchItems.map((item) => (
                    <li key={item.id}>
                      »
                      <Box
                        component="button"
                        onClick={() => {
                          onQueryChange(item.value);
                        }}
                        sx={{
                          color: (theme.palette as any).primaryDark.main,
                          fontWeight: "800",
                          fontSize: "14px",
                          background: "none",
                          border: "none",
                          "&:hover": {
                            cursor: "pointer",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {item.value}
                      </Box>
                    </li>
                  ))}
                </Box>
              </Box>
            )
          }
        />
      </Dialog>
    </ThemeProvider>
  );
};

export interface SearchButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  langCode?: langCode;
  label?: React.ReactNode;
}

export const SearchButton = ({
  onClick,
  langCode,
  label,
}: SearchButtonProps) => {
  const macOS = window.navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  const displayLabel = label || getTranslation("search", langCode);
  return (
    <Box<"button">
      component="button"
      sx={{
        "&:hover": {
          cursor: "pointer",
          background: "rgba(255,255,255,0.04)",
        },
        "&:focus-visible": {
          outline: `1px solid ${(theme.palette as any).primaryDark["300"]}`,
          borderColor: (theme.palette as any).primaryDark["300"],
        },
        backgroundColor: "inherit",
        border: `1px solid ${(theme.palette as any).primaryDark["500"]}`,
        color: theme.palette.text.secondary,
        borderRadius: "10px",
        minWidth: "210px",
        lineHeight: "32px",
        display: "flex",
        alignItems: "center",
        fontFamily: "inherit",
      }}
      onClick={onClick}
    >
      <Search
        fontSize="small"
        sx={{
          color: theme.palette.grey[100],
        }}
      />
      <Box
        component="span"
        sx={{ marginLeft: "10px", marginRight: "auto", fontSize: "16px" }}
      >
        {displayLabel}
      </Box>
      <Box
        component="span"
        sx={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${(theme.palette as any).primaryDark["500"]}`,
          borderRadius: "5px",
          lineHeight: "24px",
          padding: "0 7px",
        }}
      >
        {macOS ? "⌘" : "Ctrl+"}K
      </Box>
    </Box>
  );
};
