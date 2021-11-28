import React from "react";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DownloadIcon from "@mui/icons-material/Download";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/AppRegistration";
import ***REMOVED*** FaDiscord, FaGithub ***REMOVED*** from "react-icons/fa";
import ***REMOVED*** LanguageSelect ***REMOVED*** from "../language-select";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** LogoutResponse ***REMOVED*** from "../../src/types";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import axios from "axios";
import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const AppMenu: React.FC = () => ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const user = loggedInUser?.user;

  const [, setToast] = useToasts();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => ***REMOVED***
    setAnchorEl(event.currentTarget);
***REMOVED***;

  const handleClose = () => ***REMOVED***
    setAnchorEl(null);
***REMOVED***;

  const logout = async () => ***REMOVED***
    try ***REMOVED***
      const res = await axios.post<LogoutResponse>(
        `$***REMOVED***endpoint***REMOVED***/v2/account/logout`,
        ***REMOVED*** id: loggedInUser.user.id, loginKey: loggedInUser.loginKey ***REMOVED***
      );

      if (res.status === 200) ***REMOVED***
        if (res.data.status === "success") ***REMOVED***
          setLoggedInUser(null);
          setToast(***REMOVED***
            type: "success",
            text: t("profile:logout:successLocal"),
      ***REMOVED***);

          handleClose();
    ***REMOVED*** else ***REMOVED***
          setToast(***REMOVED*** type: "error", text: res.data.error ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED*** catch (error) ***REMOVED***
      console.log(error);
***REMOVED***
***REMOVED***;

  return (
    <React.Fragment>
      <IconButton onClick=***REMOVED***handleClick***REMOVED***>
        ***REMOVED***user && (
          <Avatar src=***REMOVED***`$***REMOVED***endpoint***REMOVED***$***REMOVED***user.pfp.filename***REMOVED***`***REMOVED*** alt=***REMOVED***user.username***REMOVED*** />
        )***REMOVED***

        ***REMOVED***!user && (
          <MenuIcon />
        )***REMOVED***
      </IconButton>

      <Menu anchorEl=***REMOVED***anchorEl***REMOVED*** open=***REMOVED***open***REMOVED*** onClose=***REMOVED***handleClose***REMOVED***>
        <div className="menu-container">
          ***REMOVED***user && (
            <React.Fragment>
              <div className="my-2">
                <Typography variant="h6" component="p" className="text-center">
                  ***REMOVED***user.username***REMOVED***
                </Typography>
              </div>
              <Divider style=***REMOVED******REMOVED***margin:"4px 0"***REMOVED******REMOVED*** />
              <Link passHref href="/profile">
                <MenuItem onClick=***REMOVED***handleClose***REMOVED***>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>***REMOVED***t("common:profile")***REMOVED***</ListItemText>
                </MenuItem>
              </Link>
            </React.Fragment>
          )***REMOVED***
          <Link href="/downloads" passHref>
            <MenuItem>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText>***REMOVED***t("downloads:title")***REMOVED***</ListItemText>
            </MenuItem>
          </Link>
          <Divider style=***REMOVED******REMOVED***margin:"4px 0"***REMOVED******REMOVED*** />
          <Link href="https://discord.gg/PbpJz8r4Pr" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              style=***REMOVED******REMOVED*** textDecoration: "none", color: "#fff" ***REMOVED******REMOVED***
            >
              <MenuItem>
                <ListItemIcon>
                  <FaDiscord style=***REMOVED******REMOVED***width:"1.5rem"***REMOVED******REMOVED*** />
                </ListItemIcon>
                <ListItemText>Discord</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Link href="https://github.com/UnusAnnusArchived" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              style=***REMOVED******REMOVED*** textDecoration: "none", color: "#fff" ***REMOVED******REMOVED***
            >
              <MenuItem>
                <ListItemIcon>
                  <FaGithub style=***REMOVED******REMOVED***width:"1.5rem"***REMOVED******REMOVED*** />
                </ListItemIcon>
                <ListItemText>Github</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Divider style=***REMOVED******REMOVED***margin:"4px 0"***REMOVED******REMOVED*** />
          <LanguageSelect />
          <Divider style=***REMOVED******REMOVED***margin:"4px 0"***REMOVED******REMOVED*** />

          ***REMOVED***user && (
            <MenuItem onClick=***REMOVED***logout***REMOVED***>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>***REMOVED***t("common:logout")***REMOVED***</ListItemText>
            </MenuItem>
          )***REMOVED***

          ***REMOVED***!user && (
            <React.Fragment>
              <Link passHref href="/register">
                <MenuItem>
                  <ListItemIcon>
                    <RegisterIcon />
                  </ListItemIcon>
                  <ListItemText>***REMOVED***t("register:title")***REMOVED***</ListItemText>
                </MenuItem>
              </Link>
              <Link passHref href="/login">
                <MenuItem>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText>***REMOVED***t("login:title")***REMOVED***</ListItemText>
                </MenuItem>
              </Link>
            </React.Fragment>
          )***REMOVED***
        </div>
      </Menu>
    </React.Fragment>
  );
***REMOVED***;

export default AppMenu;
