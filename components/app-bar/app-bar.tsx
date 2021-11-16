import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/router";
import Box from "@mui/system/Box";

const ABar: React.FC = () => {
  const [isRouting, setIsRouting] = useState(false);

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

        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
      <Fade in={isRouting}>
        <LinearProgress className="routing-progress" />
      </Fade>
    </AppBar>
  );
};

export default ABar;
