import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import React from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import ***REMOVED*** LogoutResponse ***REMOVED*** from "../../src/types";
import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import LogoutIcon from "@mui/icons-material/Logout";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** LanguageSelect ***REMOVED*** from "../language-select";
import DownloadIcon from "@mui/icons-material/Download";
import ***REMOVED*** FaDiscord, FaGithub ***REMOVED*** from "react-icons/fa";
import ***REMOVED*** useMediaQuery ***REMOVED*** from "@mui/material";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";

const ProfileIcon: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  const [, setToast] = useToasts();

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

  if (loggedInUser == null) ***REMOVED***
    return null;
***REMOVED***

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  return (
    <div id="logged-in-user-icon">
      <IconButton onClick=***REMOVED***handleClick***REMOVED***>
        <Avatar src=***REMOVED***`$***REMOVED***endpoint***REMOVED***$***REMOVED***user.pfp.filename***REMOVED***`***REMOVED*** alt=***REMOVED***user.username***REMOVED*** />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl=***REMOVED***anchorEl***REMOVED***
        open=***REMOVED***open***REMOVED***
        onClose=***REMOVED***handleClose***REMOVED***
      >
        <div className="profile-menu-container">
          <div className="my-2">
            <Typography variant="h6" component="p" className="text-center">
              ***REMOVED***user.username***REMOVED***
            </Typography>
          </div>
          <Divider style=***REMOVED******REMOVED***margin:"4px 0"***REMOVED******REMOVED*** />
          <MenuList style=***REMOVED******REMOVED***paddingTop:0***REMOVED******REMOVED***>
            <Link passHref href="/profile">
              <MenuItem onClick=***REMOVED***handleClose***REMOVED***>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>***REMOVED***t("common:profile")***REMOVED***</ListItemText>
              </MenuItem>
            </Link>
            ***REMOVED***isMdDown && (
              <Link passHref href="/downloads">
                <MenuItem onClick=***REMOVED***handleClose***REMOVED***>
                  <ListItemIcon>
                    <DownloadIcon />
                  </ListItemIcon>
                  <ListItemText>***REMOVED***t("downloads:title")***REMOVED***</ListItemText>
                </MenuItem>
              </Link>
            )***REMOVED***

            ***REMOVED***isMdDown && (
              <React.Fragment>
                <div>
                  <Divider style=***REMOVED******REMOVED***margin:"4px 0"***REMOVED******REMOVED*** />
                  <LanguageSelect />
                </div>
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
              </React.Fragment>
            )***REMOVED***
            <Divider style=***REMOVED******REMOVED***margin:"4px 0"***REMOVED******REMOVED*** />
            <MenuItem onClick=***REMOVED***logout***REMOVED***>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>***REMOVED***t("common:logout")***REMOVED***</ListItemText>
            </MenuItem>
          </MenuList>
        </div>
      </Menu>
    </div>
  );
***REMOVED***;

export default ProfileIcon;
