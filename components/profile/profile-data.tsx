import Typography from "@mui/material/Typography";
import React from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";

const ProfileData: React.FC = () => ***REMOVED***
  const [loggedInUser] = useRecoilState(userAtom);

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        Data held about your profile
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>Username:</strong> ***REMOVED***user.username***REMOVED***
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>Email:</strong> ***REMOVED***user.email***REMOVED***
      </Typography>
    </div>
  );
***REMOVED***;

export default ProfileData;
