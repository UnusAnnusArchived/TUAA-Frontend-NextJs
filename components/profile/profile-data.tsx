import Typography from "@mui/material/Typography";
import React from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";

const ProfileData: React.FC = () => ***REMOVED***
  const [loggedInUser] = useRecoilState(userAtom);
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        ***REMOVED***t("profile:dataTitle")***REMOVED***
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>***REMOVED***t("profile:username")***REMOVED***:</strong> ***REMOVED***user.username***REMOVED***
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>***REMOVED***t("profile:email")***REMOVED***:</strong> ***REMOVED***user.email***REMOVED***
      </Typography>
    </div>
  );
***REMOVED***;

export default ProfileData;
