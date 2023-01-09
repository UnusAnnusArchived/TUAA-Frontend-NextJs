import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import JSONDialog from "./profile-json-dialog";

const ProfileData: React.FC = () => {
  const [showJSONInfo, setShowJSONInfo] = useState(false);
  const [loggedInUser] = useRecoilState(userAtom);
  const { t, i18n } = useTranslation();

  const openJSONInfo = () => {
    setShowJSONInfo(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        {t("profile:data:header")}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("common:account:name")}:</strong> {loggedInUser?.name}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("common:account:username")}:</strong> {loggedInUser?.username}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("common:account:email")}:</strong> {loggedInUser?.email}{" "}
        {loggedInUser?.verified ? null : (
          <strong style={{ color: "#ff0000" }}>{t("profile:data:email_not_verified")}</strong>
        )}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("profile:data:user_id")}:</strong> <code>{loggedInUser?.id}</code>
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("profile:data:created")}:</strong>{" "}
        {moment.utc(loggedInUser?.created).locale(i18n.language).fromNow()} (
        {moment.utc(loggedInUser?.created).locale(i18n.language).local().format("MM/DD/YYYY HH:mm:ss")})
      </Typography>
      {loggedInUser?.isAdmin ? (
        <Typography variant="body1" component="p" className="my-1">
          <strong>{t("profile:data:admin_account")}</strong>
        </Typography>
      ) : null}
      <Button variant="contained" onClick={openJSONInfo}>
        {t("profile:data:json_info:action")}
      </Button>
      <JSONDialog open={showJSONInfo} setOpen={setShowJSONInfo} />
    </div>
  );
};

export default ProfileData;
