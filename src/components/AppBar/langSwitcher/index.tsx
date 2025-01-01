"use client";

import { tolgee } from "@/tolgee/client";
import { getLanguageInfo, Language } from "@/tolgee/getLanguages";
import setLanguage from "@/tools/setLanguage";
import { Check, Translate } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { T } from "@tolgee/react";
import { useEffect, useRef, useState } from "react";

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
      const languages = await getLanguageInfo();

      setLanguages(languages);
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
                key={language.code}
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
