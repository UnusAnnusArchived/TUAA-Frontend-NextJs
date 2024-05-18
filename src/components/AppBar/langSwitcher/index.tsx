"use client";

import { tolgee } from "@/tolgee/client";
import { getLanguagesClient } from "@/tolgee/getLanguages";
import setLanguage from "@/tools/setLanguage";
import { Check, Translate } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { T } from "@tolgee/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import endpoints from "@/endpoints.json";

interface Language {
  name: string;
  code: string;
}

const LangSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(tolgee.getLanguage());
  const [languages, setLanguages] = useState<Language[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    (async () => {
      //tolgee sdk doesn't have a built in way to get all languages, but the api does
      const languages = await axios.get(`${endpoints.tolgee}/v2/projects//languages`);

      // console.log(a);

      // setLanguages(
      //   a.map((value) => {
      //     return {
      //       name: value.get("language.name")!.toString()!,
      //       code: value.get("language.code")!.toString()!,
      //     };
      //   })
      // );
    })();
  }, []);

  return (
    <>
      <Tooltip title={<T keyName="header.changeLanguage" />}>
        <IconButton ref={anchorEl} onClick={handleOpen}>
          <Translate />
        </IconButton>
      </Tooltip>
      <Menu open={menuOpen} anchorEl={anchorEl.current} onClose={handleClose}>
        {languages &&
          languages.map((language) => {
            return (
              <MenuItem
                onClick={() => {
                  setLanguage(language.code);
                  setSelectedLanguage(language.code);
                }}
              >
                {language.name}
                {selectedLanguage === language.code && (
                  <span style={{ marginLeft: 10, display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
                    <Check />
                  </span>
                )}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};

export default LangSwitcher;
