import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** ChangePic ***REMOVED*** from ".";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";

const ProfilePicture: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-3">
        ***REMOVED***t("profile:pfp:title")***REMOVED***
      </Typography>
      <Avatar
        src=***REMOVED***`$***REMOVED***user.pfp.filename.startsWith("/") ? "/" : "//"***REMOVED***$***REMOVED***user.pfp.filename***REMOVED***`***REMOVED***
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
