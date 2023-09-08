import React, { useState } from "react";
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
import { AdminPanelSettings, Code, Info as InfoIcon } from "@mui/icons-material";
import AboutDialog from "../about";
import List from "@mui/icons-material/List";

const AppMenu: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

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
      pb.authStore.clear();
      setLoggedInUser(null);

      handleClose();
    } catch (error) {
      setToast({ type: "error", text: error.message ?? error.code });
    }
  };

  const openAbout = () => {
    setAboutDialogOpen(true);
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        {loggedInUser && (
          <Avatar
            src={getPbImagePath("systemprofiles0", loggedInUser?.id, loggedInUser?.avatar, 120, 120)}
            alt={loggedInUser.name}
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
                  {loggedInUser?.name ?? loggedInUser?.username ?? loggedInUser?.email ?? ""}
                </Typography>
              </div>
              <Divider style={{ margin: "4px 0" }} />
            </React.Fragment>
          )}

          <MenuItem onClick={openAbout}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>{t("pages:about")}</ListItemText>
          </MenuItem>

          {loggedInUser && (
            <Link passHref href="/profile">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>{t("pages:profile")}</ListItemText>
              </MenuItem>
            </Link>
          )}
          <Link href="/settings" passHref>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>{t("pages:settings")}</ListItemText>
            </MenuItem>
          </Link>
          <Divider style={{ margin: "4px 0" }} />
          {loggedInUser && (
            <>
            <Link href="/playlist/my-playlists" passHref>
              <MenuItem>
                <ListItemIcon>
                  <List />
                </ListItemIcon>
                <ListItemText>My Playlists</ListItemText>
              </MenuItem>
            </Link>
            <Link href="/internal/moderation" passHref>
              <MenuItem>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText>{t("pages:modTools")}</ListItemText>
                </MenuItem>
              </Link>
            </>
          )}
          <Link href="/downloads" passHref>
            <MenuItem>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText>{t("pages:downloads")}</ListItemText>
            </MenuItem>
          </Link>
          <Link href="https://docs.unusann.us" passHref>
            <a target="_blank" style={{ textDecoration: "none" }}>
              <MenuItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText>{t("pages:documentation")}</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Link href="/patreon-donors" passHref>
            <MenuItem>
              <ListItemIcon>
                <FaMoneyBill style={{ width: "1.5rem" }} />
              </ListItemIcon>
              <ListItemText>{t("pages:patreon_donors")}</ListItemText>
            </MenuItem>
          </Link>
          <Divider style={{ margin: "4px 0" }} />
          <Link href="https://discord.gg/PbpJz8r4Pr" passHref>
            <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
              <MenuItem>
                <ListItemIcon>
                  <FaDiscord style={{ width: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText>{t("menu:discord")}</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Link href="https://github.com/UnusAnnusArchived" passHref>
            <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
              <MenuItem>
                <ListItemIcon>
                  <FaGithub style={{ width: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText>{t("menu:github")}</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Link href="https://www.patreon.com/theunusannusarchive" passHref>
            <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
              <MenuItem>
                <ListItemIcon>
                  <FaPatreon style={{ width: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText>{t("menu:patreon")}</ListItemText>
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
              <ListItemText>{t("profile:logout:action")}</ListItemText>
            </MenuItem>
          )}

          {!loggedInUser && (
            <React.Fragment>
              <Link passHref href="/register">
                <MenuItem>
                  <ListItemIcon>
                    <RegisterIcon />
                  </ListItemIcon>
                  <ListItemText>{t("pages:register")}</ListItemText>
                </MenuItem>
              </Link>
              <Link passHref href="/login">
                <MenuItem>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText>{t("pages:login")}</ListItemText>
                </MenuItem>
              </Link>
            </React.Fragment>
          )}
        </div>
      </Menu>
      <AboutDialog open={aboutDialogOpen} setOpen={setAboutDialogOpen} />
    </React.Fragment>
  );
};

export default AppMenu;
