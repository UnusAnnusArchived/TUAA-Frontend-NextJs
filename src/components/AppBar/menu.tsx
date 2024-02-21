"use client";

import {
  Button,
  Divider,
  IconButton,
  List,
  useMediaQuery,
  useTheme,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  useThemeProps,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "./menuItem";
import { useRecoilState } from "recoil";
import { searchBarIsOpenContext } from "@/contexts/searchBarOpenContext";
import { T } from "@tolgee/react";

export const Menu: React.FC = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [searchBarIsOpen, setSearchBarIsOpen] = useContext(searchBarIsOpenContext);
  const [hideMenu, setHideMenu] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    if (searchBarIsOpen) {
      setTimeout(() => {
        if (!abortController.signal.aborted) {
          setHideMenu(true);
        } else {
          setHideMenu(false);
        }
      }, 300);
    } else {
      setHideMenu(false);
    }

    return () => {
      abortController.abort();
    };
  }, [searchBarIsOpen, isMdDown]);

  if (hideMenu || isMdDown) {
    return <div style={{ flexGrow: 1, height: 72 }} />;
  }
  return (
    <>
      <List
        sx={{
          transition: theme.transitions.create("opacity"),
          width: 0,
          opacity: searchBarIsOpen && !isMdDown ? 0 : 1,
          pointerEvents: searchBarIsOpen && !isMdDown ? "none" : undefined,
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MenuElements Divider={VerticalDivider} />
      </List>
    </>
  );
};

export const MobileMenu: React.FC = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorEl = useRef(null);

  const handleOpen = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  if (isMdDown) {
    return (
      <>
        <IconButton onClick={handleOpen} ref={anchorEl}>
          <MenuIcon />
        </IconButton>
        <MuiMenu open={menuOpen} onClose={handleClose} anchorEl={anchorEl.current}>
          <MenuElements Divider={Divider} isMobile={true} />
        </MuiMenu>
      </>
    );
  }

  return <></>;
};

interface MenuElementsProps {
  Divider: React.FC;
  isMobile?: boolean;
}

const MenuElements: React.FC<MenuElementsProps> = ({ Divider, isMobile }) => {
  return (
    <>
      <MenuItem href="/" isMobile={isMobile}>
        <T keyName="home.title" />
      </MenuItem>
      <Divider />
      <MenuItem href="/downloads" isMobile={isMobile}>
        <T keyName="downloads.title" />
      </MenuItem>
      <Divider />
      <MenuItem href="/settings" isMobile={isMobile}>
        <T keyName="settings.title" />
      </MenuItem>
      <Divider />
      <MenuItem href="/patreon-donors" isMobile={isMobile}>
        <T keyName="patreonDonors.title" />
      </MenuItem>
    </>
  );
};

const VerticalDivider: React.FC = () => {
  return <Divider orientation="vertical" sx={{ height: "40px" }} />;
};
