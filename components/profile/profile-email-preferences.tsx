import { FormControlLabel, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";
import { Collection } from "../../src/types";

const EmailPreferences: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  const accountEmailsChange = async () => {
    const user = await pb.collection(Collection.Users).update(loggedInUser?.id, {
      emails_account: !loggedInUser?.emails_account,
    });

    let tempUser = JSON.parse(JSON.stringify(loggedInUser)); // hacky way of copying loggedInUser so we can modify it

    tempUser.emails_account = user.emails_account;

    setLoggedInUser(tempUser);
  };

  const websiteUpdatesChange = async () => {
    const user = await pb.collection(Collection.Users).update(loggedInUser?.id, {
      emails_updates: !loggedInUser?.emails_updates,
    });

    let tempUser = JSON.parse(JSON.stringify(loggedInUser)); // hacky way of copying loggedInUser so we can modify it

    tempUser.emails_updates = user.emails_updates;

    setLoggedInUser(tempUser);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        {t("profile:email_prefs:header")}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <FormControlLabel
          control={<Switch defaultChecked={loggedInUser?.emails_account} />}
          label={t("profile:email_prefs:account_updates")}
          onClick={accountEmailsChange}
        />
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <FormControlLabel
          control={<Switch defaultChecked={loggedInUser?.emails_updates} />}
          label={t("profile:email_prefs:website_updates")}
          onChange={websiteUpdatesChange}
        />
      </Typography>
    </div>
  );
};

export default EmailPreferences;
