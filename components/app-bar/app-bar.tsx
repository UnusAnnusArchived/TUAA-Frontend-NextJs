import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import BackIcon from "@mui/icons-material/ArrowBack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../theme/theme";
import SearchIcon from "@mui/icons-material/Search";
import AppMenu from "./menu";
import Search from "../search/search";
import { useTranslation } from "react-i18next";

const ABar: React.FC = () => {
  const { t } = useTranslation();
  const [isRouting, setIsRouting] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

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

  useEffect(() => {
    const storage = globalThis?.sessionStorage;

    if (!storage) return;

    let sessionHistory: string[] = JSON.parse(storage.getItem("history") ?? "[]");

    const path = globalThis?.location.pathname;
    if (path) {
      sessionHistory.push(globalThis?.location.pathname);
    }

    storage.setItem("history", JSON.stringify(sessionHistory));
  }, [router.asPath]);

  const onClickBack = () => {
    const storage = globalThis?.sessionStorage;

    if (storage) {
      const sessionHistory: string[] = JSON.parse(storage.getItem("history") ?? "[]");

      const lastPage = sessionHistory[sessionHistory.length - 2];

      //Remove current page and last page from history (we remove the last page because navigating to it after will cause it to get added back)
      sessionHistory.splice(sessionHistory.length - 2, 2);
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

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {hasHistory() && (
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
          )}
          <Link href="/" passHref>
            <Typography variant="h6" component="div" className="pointer">
              {isMdDown ? t("pages:site_short") : t("pages:site")}
            </Typography>
          </Link>
          <div style={{ flexGrow: 1 }}>
            {!isMdDown && (
              <div style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                <Search />
              </div>
            )}
          </div>
          {isMdDown && (
            <IconButton onClick={toggleMobileSearch}>
              <SearchIcon />
            </IconButton>
          )}
          <div className="d-flex">
            <AppMenu />
          </div>
        </Toolbar>
        <Fade in={isRouting}>
          <LinearProgress className="routing-progress" />
        </Fade>
        {isMdDown && showMobileSearch && (
          <div style={{ marginBottom: 16 }}>
            <Search />
          </div>
        )}
      </AppBar>
    </>
  );
};

export default ABar;
