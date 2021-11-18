import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** Logout, ProfileData, ProfilePicture ***REMOVED*** from ".";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";

const ProfileSection: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Divider
        sx=***REMOVED******REMOVED*** width: "50%", backgroundColor: "#fff" ***REMOVED******REMOVED***
        className="my-3"
      />
      <ProfilePicture />
      <Divider
        sx=***REMOVED******REMOVED*** width: "50%", backgroundColor: "#fff" ***REMOVED******REMOVED***
        className="my-3"
      />
      <Logout />
      <Divider
        sx=***REMOVED******REMOVED*** width: "50%", backgroundColor: "#fff" ***REMOVED******REMOVED***
        className="my-3"
      />
      <ProfileData />
    </div>
  );
***REMOVED***;

export default ProfileSection;
