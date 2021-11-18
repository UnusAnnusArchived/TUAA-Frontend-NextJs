import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { endpoint } from "../../src/endpoints";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { LogoutResponse } from "../../src/types";
import { useToasts } from "@geist-ui/react";
import Link from "next/link";

const ProfileIcon: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [, setToast] = useToasts();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user } = loggedInUser;

  const logout = async () => {
    try {
      const res = await axios.post<LogoutResponse>(
        `${endpoint}/api/v2/account/logout`,
        { id: user.id, loginKey: loggedInUser.loginKey }
      );

      if (res.status === 200) {
        if (res.data.status === "success") {
          setLoggedInUser(null);
          handleClose();
        } else {
          setToast({ type: "error", text: res.data.error });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar src={`${endpoint}${user.pfp.filename}`} alt={user.username} />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className="profile-menu-container">
          <Link passHref href="/profile">
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default ProfileIcon;
