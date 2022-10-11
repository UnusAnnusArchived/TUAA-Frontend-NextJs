import { FormControlLabel, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";

const EmailPreferences: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const accountEmailsChange = async () => {
    const profile = await pb.records.update("profiles", loggedInUser?.profile.id, {
      emails_account: !loggedInUser?.profile.emails_account,
    });

    let tempUser = JSON.parse(JSON.stringify(loggedInUser)); // hacky way of copying loggedInUser so we can modify it

    tempUser.profile.emails_account = profile.emails_account;

    setLoggedInUser(tempUser);
  };

  const websiteUpdatesChange = async () => {
    const profile = await pb.records.update("profiles", loggedInUser?.profile.id, {
      emails_updates: !loggedInUser?.profile.emails_updates,
    });

    let tempUser = JSON.parse(JSON.stringify(loggedInUser)); // hacky way of copying loggedInUser so we can modify it

    tempUser.profile.emails_updates = profile.emails_updates;

    setLoggedInUser(tempUser);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        Email Preferences
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <FormControlLabel
          control={<Switch defaultChecked={loggedInUser?.profile.emails_account} />}
          label="Account Updates"
          onClick={accountEmailsChange}
        />
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <FormControlLabel
          control={<Switch defaultChecked={loggedInUser?.profile.emails_updates} />}
          label="Website Updates"
          onChange={websiteUpdatesChange}
        />
      </Typography>
    </div>
  );
};

export default EmailPreferences;
