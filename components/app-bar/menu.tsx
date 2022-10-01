import React from "react";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DownloadIcon from "@mui/icons-material/Download";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/AppRegistration";
import { FaDiscord, FaGithub, FaPatreon, FaMoneyBill } from "react-icons/fa";
import { LanguageSelect } from "../language-select";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { LogoutResponse } from "../../src/types";
import { endpoint, siteRoot } from "../../src/endpoints";
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
import pb from "../../src/pocketbase";
import getPbImagePath from "../../src/utils/getPbImagePath";

const AppMenu: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
      await pb.authStore.clear();
      setLoggedInUser(null);

      handleClose();
    } catch (error) {
      setToast({ type: "error", text: error.message ?? error.code });
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        {loggedInUser && (
          <Avatar
            src={getPbImagePath("systemprofiles0", loggedInUser?.profile?.id, loggedInUser?.profile?.avatar, 120, 120)}
            alt={loggedInUser?.profile?.name}
          />
        )}

        {!loggedInUser && <MenuIcon />}
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="menu-container">
          {loggedInUser && (
            <React.Fragment>
              <div className="my-2">
                <Typography variant="h6" component="p" className="text-center">
                  {loggedInUser?.profile?.name === "" ? loggedInUser?.email : loggedInUser?.profile?.name}
                </Typography>
              </div>
              <Divider style={{ margin: "4px 0" }} />
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
          <Link href="/settings" passHref>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>{t("settings:title")}</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/downloads" passHref>
            <MenuItem>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText>{t("downloads:title")}</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/patreon-donors" passHref>
            <MenuItem>
              <ListItemIcon>
                <FaMoneyBill style={{ width: "1.5rem" }} />
              </ListItemIcon>
              <ListItemText>Patreon Donors</ListItemText>
            </MenuItem>
          </Link>
          <Divider style={{ margin: "4px 0" }} />
          <Link href="https://discord.gg/PbpJz8r4Pr" passHref>
            <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
              <MenuItem>
                <ListItemIcon>
                  <FaDiscord style={{ width: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText>Discord</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Link href="https://github.com/UnusAnnusArchived" passHref>
            <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
              <MenuItem>
                <ListItemIcon>
                  <FaGithub style={{ width: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText>Github</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Link href="https://www.patreon.com/theunusannusarchive" passHref>
            <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
              <MenuItem>
                <ListItemIcon>
                  <FaPatreon style={{ width: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText>Patreon</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Divider style={{ margin: "4px 0" }} />
          <LanguageSelect />
          <Divider style={{ margin: "4px 0" }} />

          {loggedInUser && (
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>{t("common:logout")}</ListItemText>
            </MenuItem>
          )}

          {!loggedInUser && (
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
