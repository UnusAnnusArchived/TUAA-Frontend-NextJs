import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../theme/theme";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { availableLanguages } from "../../src/i18n/i18n";
import Link from "next/link";
import { useRouter } from "next/router";

const LanguageSelect: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  const router = useRouter();

  return (
    <div>
      <div onClick={(event) => setAnchorEl(event.currentTarget)}>
        <MenuItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText>{t("language:name")}</ListItemText>
        </MenuItem>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="menu-container">
          {availableLanguages.map((language, i) => (
            <Link
              key={i}
              passHref
              href={{
                pathname: router.pathname,
                query: { ...router.query },
              }}
              locale={language.code}
            >
              <MenuItem onClick={handleClose}>{language.name}</MenuItem>
            </Link>
          ))}
        </div>
      </Menu>
    </div>
  );
};

export default LanguageSelect;
