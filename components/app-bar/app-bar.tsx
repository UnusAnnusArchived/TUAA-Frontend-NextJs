import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, ***REMOVED*** useState, useEffect ***REMOVED*** from "react";
import Link from "next/link";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import Box from "@mui/system/Box";

const ABar: React.FC = () => ***REMOVED***
  const [isRouting, setIsRouting] = useState(false);

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

  return (
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

        ***REMOVED***/* <Button color="inherit">Login</Button> */***REMOVED***
      </Toolbar>
      <Fade in=***REMOVED***isRouting***REMOVED***>
        <LinearProgress className="routing-progress" />
      </Fade>
    </AppBar>
  );
***REMOVED***;

export default ABar;
