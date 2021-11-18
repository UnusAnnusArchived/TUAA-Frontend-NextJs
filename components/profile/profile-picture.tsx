import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** ChangePic ***REMOVED*** from ".";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";

const ProfilePicture: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-3">
        Your profile picture
      </Typography>
      <Avatar
        src=***REMOVED***`$***REMOVED***endpoint***REMOVED***$***REMOVED***user.pfp.filename***REMOVED***`***REMOVED***
        alt=***REMOVED***user.username***REMOVED***
        className="my-1"
        sx=***REMOVED******REMOVED*** width: 80, height: 80 ***REMOVED******REMOVED***
      />
      <div className="my-3">
        <ChangePic />
      </div>
    </div>
  );
***REMOVED***;

export default ProfilePicture;
