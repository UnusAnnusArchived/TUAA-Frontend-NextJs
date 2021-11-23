import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";
import Box from "@mui/system/Box";
import { useRecoilState } from "recoil";
import { previousPageAtom, userAtom } from "../../src/atoms";
import { ProfileIcon } from "../profile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { FaDiscord, FaGithub } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import BackIcon from "@mui/icons-material/ArrowBack";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../theme/theme";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../language-select";

const ABar: React.FC = () => {
  const [isRouting, setIsRouting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [, setPreviousPage] = useRecoilState(previousPageAtom);
  const { t } = useTranslation();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleRoutingEnd = () => {
    setIsRouting(false);
  };
  const handleRoutingStart = () => {
    setIsRouting(true);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRoutingStart);
    router.events.on("routeChangeComplete", handleRoutingEnd);
    return () => {
      router.events.off("routeChangeStart", handleRoutingStart);
      router.events.off("routeChangeComplete", handleRoutingEnd);
    };
  }, []);

  const onClickLogin = () => {
    setPreviousPage(router.asPath);
    router.push("/login");
  };

  useEffect(() => {
    const storage = globalThis?.sessionStorage;

    if (!storage) return;

    let sessionHistory:string[] = JSON.parse(storage.getItem("history") ?? "[]");

    const path = globalThis?.location.pathname;
    if (path) {
      sessionHistory.push(globalThis?.location.pathname);
    };

    storage.setItem("history", JSON.stringify(sessionHistory));

    console.log(sessionHistory);
  }, [router.asPath]);

  const onClickBack = () => {
    const storage = globalThis?.sessionStorage;

    if (storage) {
      const sessionHistory:string[] = JSON.parse(storage.getItem("history") ?? "[]");

      const lastPage = sessionHistory[sessionHistory.length-2];
      
      //Remove current page and last page from history (we remove the last page because navigating to it after will cause it to get added back)
      sessionHistory.splice(sessionHistory.length-2, 2);
      storage.setItem("history", JSON.stringify(sessionHistory));

      router.replace(lastPage);
    } else {
      router.back();
    }
  };

  const hasHistory = () => {
    const storage = globalThis?.sessionStorage;

    if (storage) {
      try {
        return JSON.parse(storage.getItem("history")).length > 0;
      } catch (err) {
        console.error(err);
        return false;
      }
    } else return false;
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {hasHistory() &&
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onClickBack}
          >
            <BackIcon />
          </IconButton>
          }
          <Link href="/" passHref>
            <Typography
              variant="h6"
              component="div"
              className="pointer"
              // sx={{ flexGrow: 1 }}
            >
              The Unus Annus Archive
            </Typography>
          </Link>
          {/* {course && (
          <Typography variant="h6" component="div" className="ellipsis">
            {course.name}
          </Typography>
        )} */}
          <Box sx={{ flexGrow: 1 }} />
          {!isMdDown && (
            <div className="d-flex">
              <Link href="/downloads" passHref>
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </Link>
              <Link href="https://discord.gg/PbpJz8r4Pr" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <IconButton>
                    <FaDiscord />
                  </IconButton>
                </a>
              </Link>
              <Link href="https://github.com/UnusAnnusArchived" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <IconButton>
                    <FaGithub />
                  </IconButton>
                </a>
              </Link>
              <LanguageSelect />
              {!loggedInUser && (
                <Link passHref href="/register">
                  <Button color="inherit">{t("register:title")}</Button>
                </Link>
              )}
              {!loggedInUser && (
                <Button color="inherit" onClick={onClickLogin}>
                  {t("login:title")}
                </Button>
              )}
            </div>
          )}
          {!loggedInUser && isMdDown && (
            <IconButton onClick={handleClick}>
              <MenuIcon />
            </IconButton>
          )}
          <ProfileIcon />
        </Toolbar>
        <Fade in={isRouting}>
          <LinearProgress className="routing-progress" />
        </Fade>
      </AppBar>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="menu-container">
          <Link href="https://discord.gg/PbpJz8r4Pr" passHref>
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <FaDiscord />
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
                  <FaGithub />
                </ListItemIcon>
                <ListItemText>Github</ListItemText>
              </MenuItem>
            </a>
          </Link>
          <Divider />
          <LanguageSelect />
          <Divider />

          <Link passHref href="/register">
            <MenuItem>
              <Button color="inherit">{t("register:title")}</Button>
            </MenuItem>
          </Link>
          <MenuItem>
            <Button color="inherit" onClick={onClickLogin}>
              {t("login:title")}
            </Button>
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default ABar;
