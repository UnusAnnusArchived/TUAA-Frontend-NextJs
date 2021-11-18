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
import GitHubIcon from "@mui/icons-material/GitHub";
import { FaDiscord } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";

const ABar: React.FC = () => {
  const [isRouting, setIsRouting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [, setPreviousPage] = useRecoilState(previousPageAtom);

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

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="div"
            className="pointer"
            // sx={{ flexGrow: 1 }}
          >
            The Unus Anus Archive
          </Typography>
        </Link>
        {/* {course && (
          <Typography variant="h6" component="div" className="ellipsis">
            {course.name}
          </Typography>
        )} */}
        <Box sx={{ flexGrow: 1 }} />
        <div className="d-md-flex d-none">
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
          {!loggedInUser && (
            <Link passHref href="/register">
              <Button color="inherit">Register</Button>
            </Link>
          )}
          {!loggedInUser && (
            <Button color="inherit" onClick={onClickLogin}>
              Login
            </Button>
          )}
        </div>
        {!loggedInUser && (
          <div className="d-flex d-md-none">
            <IconButton onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
                      <GitHubIcon />
                    </ListItemIcon>
                    <ListItemText>Github</ListItemText>
                  </MenuItem>
                </a>
              </Link>
              <Divider />
              <Link passHref href="/register">
                <MenuItem>
                  <Button color="inherit">Register</Button>
                </MenuItem>
              </Link>
              <MenuItem>
                <Button color="inherit" onClick={onClickLogin}>
                  Login
                </Button>
              </MenuItem>
            </Menu>
          </div>
        )}
        {loggedInUser && <ProfileIcon />}
      </Toolbar>
      <Fade in={isRouting}>
        <LinearProgress className="routing-progress" />
      </Fade>
    </AppBar>
  );
};

export default ABar;
