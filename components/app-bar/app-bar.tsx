import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, ***REMOVED*** useState, useEffect ***REMOVED*** from "react";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";
import BackIcon from "@mui/icons-material/ArrowBack";
import useMediaQuery from "@mui/material/useMediaQuery";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import AppMenu from "./menu";
import Search from "../search/search";

const ABar: React.FC = () => ***REMOVED***
  const [isRouting, setIsRouting] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();

  const handleRoutingEnd = () => ***REMOVED***
    setIsRouting(false);
***REMOVED***;
  const handleRoutingStart = () => ***REMOVED***
    setIsRouting(true);
***REMOVED***;

  useEffect(() => ***REMOVED***
    router.events.on("routeChangeStart", handleRoutingStart);
    router.events.on("routeChangeComplete", handleRoutingEnd);
    return () => ***REMOVED***
      router.events.off("routeChangeStart", handleRoutingStart);
      router.events.off("routeChangeComplete", handleRoutingEnd);
***REMOVED***;
***REMOVED*** []);

  useEffect(() => ***REMOVED***
    const storage = globalThis?.sessionStorage;

    if (!storage) return;

    let sessionHistory:string[] = JSON.parse(storage.getItem("history") ?? "[]");

    const path = globalThis?.location.pathname;
    if (path) ***REMOVED***
      sessionHistory.push(globalThis?.location.pathname);
***REMOVED***;

    storage.setItem("history", JSON.stringify(sessionHistory));
***REMOVED*** [router.asPath]);

  const onClickBack = () => ***REMOVED***
    const storage = globalThis?.sessionStorage;

    if (storage) ***REMOVED***
      const sessionHistory:string[] = JSON.parse(storage.getItem("history") ?? "[]");

      const lastPage = sessionHistory[sessionHistory.length-2];
      
      //Remove current page and last page from history (we remove the last page because navigating to it after will cause it to get added back)
      sessionHistory.splice(sessionHistory.length-2, 2);
      storage.setItem("history", JSON.stringify(sessionHistory));

      router.replace(lastPage);
***REMOVED*** else ***REMOVED***
      router.back();
***REMOVED***
***REMOVED***;

  const hasHistory = () => ***REMOVED***
    const storage = globalThis?.sessionStorage;

    if (storage) ***REMOVED***
      try ***REMOVED***
        return JSON.parse(storage.getItem("history")).length > 0;
  ***REMOVED*** catch (err) ***REMOVED***
        console.error(err);
        return false;
  ***REMOVED***
***REMOVED*** else return false;
***REMOVED***;

  const toggleMobileSearch = () => ***REMOVED***
    setShowMobileSearch(!showMobileSearch);
***REMOVED***;

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          ***REMOVED***hasHistory() &&
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx=***REMOVED******REMOVED*** mr: 2 ***REMOVED******REMOVED***
            onClick=***REMOVED***onClickBack***REMOVED***
          >
            <BackIcon />
          </IconButton>
      ***REMOVED***
          <Link href="/" passHref>
            <Typography
              variant="h6"
              component="div"
              className="pointer"
            >
              The Unus Annus Archive
            </Typography>
          </Link>
          <Box sx=***REMOVED******REMOVED*** flexGrow: 1 ***REMOVED******REMOVED***>
            ***REMOVED***!isMdDown && (
              <div style=***REMOVED******REMOVED***justifyContent:"center",alignItems:"center",textAlign:"center"***REMOVED******REMOVED***>
                <Search />
              </div>
            )***REMOVED***
          </Box>
          ***REMOVED***isMdDown && (
              <IconButton onClick=***REMOVED***toggleMobileSearch***REMOVED***>
                <SearchIcon />
              </IconButton>
            )***REMOVED***
          <div className="d-flex">
            <AppMenu />
          </div>
        </Toolbar>
        <Fade in=***REMOVED***isRouting***REMOVED***>
          <LinearProgress className="routing-progress" />
        </Fade>
        ***REMOVED***isMdDown && showMobileSearch && (
          <div style=***REMOVED******REMOVED***marginBottom:16***REMOVED******REMOVED***>
            <Search />
          </div>
        )***REMOVED***
      </AppBar>
    </>
  );
***REMOVED***;

export default ABar;
