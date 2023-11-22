"use client";

import { searchBarIsOpenContext } from "@/contexts/searchBarOpenContext";
import { searchButtonCoordsContext } from "@/contexts/searchButtonCoordsContext";
import { useClientTranslation } from "@/hooks/useTranslation";
import { Close, Search } from "@mui/icons-material";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { useContext, useEffect, useMemo, useRef } from "react";
import { useRecoilState } from "recoil";
import T from "../../T";

const SearchButton: React.FC = () => {
  const [t] = useClientTranslation(useRecoilState);
  const searchButton = useRef<HTMLAnchorElement | null>(null);
  const [searchBarIsOpen, setSearchBarIsOpen] = useContext(searchBarIsOpenContext);
  const [_, setSearchButtonCoords] = useContext(searchButtonCoordsContext);

  useEffect(() => {
    handleWindowResize();
  }, [searchButton, searchButton.current]);

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", handleWindowResize);
    }

    return () => {
      if (window) {
        window.removeEventListener("resize", handleWindowResize);
      }
    };
  }, []);

  const handleWindowResize = () => {
    const coords = searchButton.current?.getBoundingClientRect?.();

    setSearchButtonCoords([coords?.x ?? 0, coords?.y ?? 0, coords?.width ?? 0, coords?.height ?? 0]);
  };

  const handleClick = () => {
    setSearchBarIsOpen(!searchBarIsOpen);
  };

  return (
    <Tooltip title={searchBarIsOpen ? <T>{t.header.closeSearch}</T> : <T>{t.header.openSearch}</T>}>
      <IconButton ref={searchButton} href="#" onClick={handleClick}>
        {searchBarIsOpen ? <Close /> : <Search />}
      </IconButton>
    </Tooltip>
  );
};

export default SearchButton;
