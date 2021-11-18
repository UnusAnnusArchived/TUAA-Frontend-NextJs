import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ***REMOVED*** availableLanguages ***REMOVED*** from "../../src/i18n/i18n";
import Link from "next/link";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";

const LanguageSelect: React.FC = () => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => ***REMOVED***
    setAnchorEl(event.currentTarget);
***REMOVED***;
  const handleClose = () => ***REMOVED***
    setAnchorEl(null);
***REMOVED***;
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleLanguageChange = (lang: string) => ***REMOVED***
    i18n.changeLanguage(lang);
    handleClose();
***REMOVED***;

  const router = useRouter();

  return (
    <div>
      ***REMOVED***!isMdDown && (
        <Tooltip title=***REMOVED***t("common:language")***REMOVED***>
          <IconButton
            aria-haspopup="true"
            aria-expanded=***REMOVED***open ? "true" : undefined***REMOVED***
            onClick=***REMOVED***handleClick***REMOVED***
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>
      )***REMOVED***
      ***REMOVED***isMdDown && (
        <MenuItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText>***REMOVED***t("common:language")***REMOVED***</ListItemText>
        </MenuItem>
        // <Button
        //   aria-haspopup="true"
        //   aria-expanded=***REMOVED***open ? "true" : undefined***REMOVED***
        //   onClick=***REMOVED***handleClick***REMOVED***
        // >

        // </Button>
      )***REMOVED***
      <Menu anchorEl=***REMOVED***anchorEl***REMOVED*** open=***REMOVED***open***REMOVED*** onClose=***REMOVED***handleClose***REMOVED***>
        ***REMOVED***availableLanguages.map((language, i) => (
          <Link
            key=***REMOVED***i***REMOVED***
            passHref
            href=***REMOVED******REMOVED***
              pathname: router.pathname,
              query: ***REMOVED*** ...router.query ***REMOVED***,
        ***REMOVED******REMOVED***
            locale=***REMOVED***language.code***REMOVED***
          >
            <MenuItem onClick=***REMOVED***handleClose***REMOVED***>***REMOVED***language.name***REMOVED***</MenuItem>
          </Link>
        ))***REMOVED***
      </Menu>
    </div>
  );
***REMOVED***;

export default LanguageSelect;
