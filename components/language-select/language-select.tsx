import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../theme/theme";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
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
      {!isMdDown && (
        <Tooltip title={t("common:language")}>
          <IconButton
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>
      )}
      {isMdDown && (
        <MenuItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText>{t("common:language")}</ListItemText>
        </MenuItem>
        // <Button
        //   aria-haspopup="true"
        //   aria-expanded={open ? "true" : undefined}
        //   onClick={handleClick}
        // >

        // </Button>
      )}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
      </Menu>
    </div>
  );
};

export default LanguageSelect;
