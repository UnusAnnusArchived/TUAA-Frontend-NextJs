import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import React from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import ***REMOVED*** LogoutResponse ***REMOVED*** from "../../src/types";
import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfileIcon: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [, setToast] = useToasts();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => ***REMOVED***
    setAnchorEl(event.currentTarget);
***REMOVED***;
  const handleClose = () => ***REMOVED***
    setAnchorEl(null);
***REMOVED***;

  const logout = async () => ***REMOVED***
    try ***REMOVED***
      const res = await axios.post<LogoutResponse>(
        `$***REMOVED***endpoint***REMOVED***/api/v2/account/logout`,
        ***REMOVED*** id: loggedInUser.user.id, loginKey: loggedInUser.loginKey ***REMOVED***
      );

      if (res.status === 200) ***REMOVED***
        if (res.data.status === "success") ***REMOVED***
          setLoggedInUser(null);
          setToast(***REMOVED***
            type: "success",
            text: "You have logged out successfully",
      ***REMOVED***);

          handleClose();
    ***REMOVED*** else ***REMOVED***
          setToast(***REMOVED*** type: "error", text: res.data.error ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED*** catch (error) ***REMOVED***
      console.log(error);
***REMOVED***
***REMOVED***;

  if (loggedInUser == null) ***REMOVED***
    return null;
***REMOVED***

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  return (
    <div id="logged-in-user-icon">
      <IconButton onClick=***REMOVED***handleClick***REMOVED***>
        <Avatar src=***REMOVED***`$***REMOVED***endpoint***REMOVED***$***REMOVED***user.pfp.filename***REMOVED***`***REMOVED*** alt=***REMOVED***user.username***REMOVED*** />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl=***REMOVED***anchorEl***REMOVED***
        open=***REMOVED***open***REMOVED***
        onClose=***REMOVED***handleClose***REMOVED***
      >
        <div className="profile-menu-container">
          <div className="my-2">
            <Typography variant="h6" component="p" className="text-center">
              ***REMOVED***user.username***REMOVED***
            </Typography>
            <Divider className="mt-2" />
          </div>
          <MenuList>
            <Link passHref href="/profile">
              <MenuItem onClick=***REMOVED***handleClose***REMOVED***>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
            </Link>
            <MenuItem onClick=***REMOVED***logout***REMOVED***>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </MenuList>
        </div>
      </Menu>
    </div>
  );
***REMOVED***;

export default ProfileIcon;
