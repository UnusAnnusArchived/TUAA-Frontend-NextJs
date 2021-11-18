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

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  const logout = async () => ***REMOVED***
    try ***REMOVED***
      const res = await axios.post<LogoutResponse>(
        `$***REMOVED***endpoint***REMOVED***/api/v2/account/logout`,
        ***REMOVED*** id: user.id, loginKey: loggedInUser.loginKey ***REMOVED***
      );

      if (res.status === 200) ***REMOVED***
        if (res.data.status === "success") ***REMOVED***
          setLoggedInUser(null);
          handleClose();
    ***REMOVED*** else ***REMOVED***
          setToast(***REMOVED*** type: "error", text: res.data.error ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED*** catch (error) ***REMOVED***
      console.log(error);
***REMOVED***
***REMOVED***;

  return (
    <div>
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
          <Link passHref href="/profile">
            <MenuItem onClick=***REMOVED***handleClose***REMOVED***>Profile</MenuItem>
          </Link>
          <MenuItem onClick=***REMOVED***logout***REMOVED***>Logout</MenuItem>
        </div>
      </Menu>
    </div>
  );
***REMOVED***;

export default ProfileIcon;
