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
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import LogoutIcon from "@mui/icons-material/Logout";

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

  const logout = async () => {
    try {
      const res = await axios.post<LogoutResponse>(
        `${endpoint}/api/v2/account/logout`,
        { id: loggedInUser.user.id, loginKey: loggedInUser.loginKey }
      );

      if (res.status === 200) {
        if (res.data.status === "success") {
          setLoggedInUser(null);
          setToast({
            type: "success",
            text: "You have logged out successfully",
          });

          handleClose();
        } else {
          setToast({ type: "error", text: res.data.error });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedInUser == null) {
    return null;
  }

  const { user } = loggedInUser;

  return (
    <div id="logged-in-user-icon">
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
          <div className="my-2">
            <Typography variant="h6" component="p" className="text-center">
              {user.username}
            </Typography>
            <Divider className="mt-2" />
          </div>
          <MenuList>
            <Link passHref href="/profile">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
            </Link>
            <MenuItem onClick={logout}>
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
};

export default ProfileIcon;
