import Divider from "@mui/material/Divider";
import React from "react";
import { useRecoilState } from "recoil";
import { Logout, ProfileData, ProfilePicture } from ".";
import { userAtom } from "../../src/atoms";
import EmailPreferences from "./profile-email-preferences";
import VerifyProfile from "./profile-verify";

const ProfileSection: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {!loggedInUser.verified ? (
        <>
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
          <VerifyProfile />
        </>
      ) : null}
      <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
      <ProfilePicture />
      <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
      <ProfileData />
      <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
      <EmailPreferences />
      <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
      <Logout />
    </div>
  );
};

export default ProfileSection;
