import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, ***REMOVED*** useState, useEffect ***REMOVED*** from "react";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import Box from "@mui/system/Box";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** previousPageAtom, userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** ProfileIcon ***REMOVED*** from "../profile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import ***REMOVED*** FaDiscord ***REMOVED*** from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** LanguageSelect ***REMOVED*** from "../language-select";

const ABar: React.FC = () => ***REMOVED***
  const [isRouting, setIsRouting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [, setPreviousPage] = useRecoilState(previousPageAtom);
  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => ***REMOVED***
    setAnchorEl(event.currentTarget);
***REMOVED***;
  const handleClose = () => ***REMOVED***
    setAnchorEl(null);
***REMOVED***;

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

  const onClickLogin = () => ***REMOVED***
    setPreviousPage(router.asPath);
    router.push("/login");
***REMOVED***;

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          ***REMOVED***/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx=***REMOVED******REMOVED*** mr: 2 ***REMOVED******REMOVED***
        >
          <MenuIcon />
        </IconButton> */***REMOVED***
          <Link href="/" passHref>
            <Typography
              variant="h6"
              component="div"
              className="pointer"
              // sx=***REMOVED******REMOVED*** flexGrow: 1 ***REMOVED******REMOVED***
            >
              The Unus Anus Archive
            </Typography>
          </Link>
          ***REMOVED***/* ***REMOVED***course && (
          <Typography variant="h6" component="div" className="ellipsis">
            ***REMOVED***course.name***REMOVED***
          </Typography>
        )***REMOVED*** */***REMOVED***
          <Box sx=***REMOVED******REMOVED*** flexGrow: 1 ***REMOVED******REMOVED*** />
          ***REMOVED***!isMdDown && (
            <div className="d-flex">
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
                    <GitHubIcon />
                  </IconButton>
                </a>
              </Link>
              <LanguageSelect />
              ***REMOVED***!loggedInUser && (
                <Link passHref href="/register">
                  <Button color="inherit">***REMOVED***t("register:title")***REMOVED***</Button>
                </Link>
              )***REMOVED***
              ***REMOVED***!loggedInUser && (
                <Button color="inherit" onClick=***REMOVED***onClickLogin***REMOVED***>
                  ***REMOVED***t("login:title")***REMOVED***
                </Button>
              )***REMOVED***
            </div>
          )***REMOVED***
          ***REMOVED***!loggedInUser && isMdDown && (
            <IconButton onClick=***REMOVED***handleClick***REMOVED***>
              <MenuIcon />
            </IconButton>
          )***REMOVED***
          <ProfileIcon />
        </Toolbar>
        <Fade in=***REMOVED***isRouting***REMOVED***>
          <LinearProgress className="routing-progress" />
        </Fade>
      </AppBar>
      <Menu anchorEl=***REMOVED***anchorEl***REMOVED*** open=***REMOVED***open***REMOVED*** onClose=***REMOVED***handleClose***REMOVED***>
        <Link href="https://discord.gg/PbpJz8r4Pr" passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            style=***REMOVED******REMOVED*** textDecoration: "none", color: "#fff" ***REMOVED******REMOVED***
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
            style=***REMOVED******REMOVED*** textDecoration: "none", color: "#fff" ***REMOVED******REMOVED***
          >
            <MenuItem>
              <ListItemIcon>
                <GitHubIcon />
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
            <Button color="inherit">***REMOVED***t("register:title")***REMOVED***</Button>
          </MenuItem>
        </Link>
        <MenuItem>
          <Button color="inherit" onClick=***REMOVED***onClickLogin***REMOVED***>
            ***REMOVED***t("login:title")***REMOVED***
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
***REMOVED***;

export default ABar;
