"use client";

import { searchBarIsOpenContext } from "@/contexts/searchBarOpenContext";
import { searchButtonCoordsContext } from "@/contexts/searchButtonCoordsContext";
import { Divider, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ChangeEventHandler, useContext, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { T } from "@tolgee/react";
import styles from "./searchBar.module.scss";
import SearchResults from "./searchResults";

export const DesktopSearchBar: React.FC = () => {
  const theme = useTheme();
  const searchBarRef = useRef<HTMLInputElement>(null);
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const [searchBarIsOpen] = useContext(searchBarIsOpenContext);
  const [[searchBtnX, searchBtnY, searchBtnHeight]] = useContext(searchButtonCoordsContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (searchBarIsOpen && searchBarRef.current) {
      searchBarRef.current.focus();
    }

    if (!searchBarIsOpen && query !== "") {
      setQuery("");
    }
  }, [searchBarIsOpen]);

  const handleSetQuery: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setQuery(evt.target.value);
  };

  if (!isMdDown) {
    return (
      <>
        <TextField
          value={query}
          onChange={handleSetQuery}
          variant="outlined"
          label={<T keyName="header.search" />}
          autoComplete="off"
          inputRef={searchBarRef}
          sx={{
            opacity: searchBarIsOpen ? 1 : 0,
            width: isLgDown ? "calc(100vw - 210px)" : "calc(100vw - 380px)",
            position: "absolute",
            left: isLgDown ? `calc(${searchBtnX}px - (100vw - 205px))` : `calc(${searchBtnX}px - (100vw - 375px))`,
            top: (2 * searchBtnY + searchBtnHeight - 56) / 2,
            transition: theme.transitions.create(["width", "position", "left", "top", "opacity"]),
          }}
        />
        <Paper
          sx={{
            transition: theme.transitions.create("height"),
            position: "absolute",
            top: 2 * searchBtnY + searchBtnHeight,
            left: 0,
            width: "100vw",
            height: searchBarIsOpen ? `calc(100vh - ${2 * searchBtnY + searchBtnHeight}px)` : 0,
            pointerEvents: searchBarIsOpen ? undefined : "none",
            overflowX: "hidden",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SearchResults query={query} />
        </Paper>
      </>
    );
  }

  return <></>;
};

export const MobileSearchBar: React.FC = () => {
  const theme = useTheme();
  const searchBarRef = useRef<HTMLInputElement>(null);
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [searchBarIsOpen] = useContext(searchBarIsOpenContext);
  const [[searchBtnX, searchBtnY, searchBtnHeight]] = useContext(searchButtonCoordsContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (searchBarIsOpen && searchBarRef.current) {
      searchBarRef.current.focus({ preventScroll: true });
    }

    if (!searchBarIsOpen && query !== "") {
      setQuery("");
    }
  }, [searchBarIsOpen]);

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setQuery(evt.target.value);
  };

  if (isMdDown) {
    return (
      <>
        <Paper
          sx={{
            transition: theme.transitions.create(["height"]),
            position: "absolute",
            top: 2 * searchBtnY + searchBtnHeight,
            left: 0,
            width: "100vw",
            height: searchBarIsOpen ? `calc(100vh - ${2 * searchBtnY + searchBtnHeight}px )` : 0,
            pointerEvents: searchBarIsOpen ? undefined : "none",
            overflowX: "hidden",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "2rem 1rem 1rem 1rem",
            }}
          >
            <TextField
              value={query}
              onChange={handleQueryChange}
              variant="outlined"
              label={<T keyName="header.search" />}
              autoComplete="off"
              fullWidth
              inputRef={searchBarRef}
            />
          </div>
          <Divider sx={{ width: "calc(100% - 2rem)" }} />

          <SearchResults query={query} />
        </Paper>
      </>
    );
  }

  return <></>;
};
