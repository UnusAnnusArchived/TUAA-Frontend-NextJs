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
import { FaDiscord, FaGithub } from "react-icons/fa";
import { LanguageSelect } from "../language-select";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { LogoutResponse } from "../../src/types";
import { endpoint } from "../../src/endpoints";
import axios from "axios";
import { useToasts } from "@geist-ui/react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "../theme/theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const AppMenu: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const user = loggedInUser?.user;

  const [, setToast] = useToasts();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      const res = await axios.post<LogoutResponse>(
        `${endpoint}/v2/account/logout`,
        { id: loggedInUser.user.id, loginKey: loggedInUser.loginKey }
      );

      if (res.status === 200) {
        if (res.data.status === "success") {
          setLoggedInUser(null);
          setToast({
            type: "success",
            text: t("profile:logout:successLocal"),
          });

          handleClose();
        } else {
          setToast({ type: "error", text: res.data.error });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        {user && (
          <Avatar src={`${endpoint}${user.pfp.filename}`} alt={user.username} />
        )}

        {!user && (
          <MenuIcon />
        )}
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="menu-container">
          {user && (
            <React.Fragment>
              <div className="my-2">
                <Typography variant="h6" component="p" className="text-center">
                  {user.username}
                </Typography>
              </div>
              <Divider style={{margin:"4px 0"}} />
              <Link passHref href="/profile">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>{t("common:profile")}</ListItemText>
                </MenuItem>
              </Link>
            </React.Fragment>
          )}
          <Link href="/downloads" passHref>
            <MenuItem>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText>{t("downloads:title")}</ListItemText>
            </MenuItem>
          </Link>
          <Divider style={{margin:"4px 0"}} />
          <Link href="https://discord.gg/PbpJz8r4Pr" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <FaDiscord style={{width:"1.5rem"}} />
                </ListItemIcon>
                <ListItemText>Discord</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Link href="https://github.com/UnusAnnusArchived" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <FaGithub style={{width:"1.5rem"}} />
                </ListItemIcon>
                <ListItemText>Github</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Divider style={{margin:"4px 0"}} />
          <LanguageSelect />
          <Divider style={{margin:"4px 0"}} />

          {user && (
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>{t("common:logout")}</ListItemText>
            </MenuItem>
          )}

          {!user && (
            <React.Fragment>
              <Link passHref href="/register">
                <MenuItem>
                  <ListItemIcon>
                    <RegisterIcon />
                  </ListItemIcon>
                  <ListItemText>{t("register:title")}</ListItemText>
                </MenuItem>
              </Link>
              <Link passHref href="/login">
                <MenuItem>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText>{t("login:title")}</ListItemText>
                </MenuItem>
              </Link>
            </React.Fragment>
          )}
        </div>
      </Menu>
    </React.Fragment>
  );
};

export default AppMenu;
