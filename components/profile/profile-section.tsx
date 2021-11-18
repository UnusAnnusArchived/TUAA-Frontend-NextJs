import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRecoilState } from "recoil";
import { Logout, ProfileData, ProfilePicture } from ".";
import { userAtom } from "../../src/atoms";
import { endpoint } from "../../src/endpoints";

const ProfileSection: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const { user } = loggedInUser;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Divider
        sx={{ width: "50%", backgroundColor: "#fff" }}
        className="my-3"
      />
      <ProfilePicture />
      <Divider
        sx={{ width: "50%", backgroundColor: "#fff" }}
        className="my-3"
      />
      <Logout />
      <Divider
        sx={{ width: "50%", backgroundColor: "#fff" }}
        className="my-3"
      />
      <ProfileData />
    </div>
  );
};

export default ProfileSection;
