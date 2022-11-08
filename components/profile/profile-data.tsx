import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
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
        {t("profile:dataTitle")}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("profile:username")}:</strong> {loggedInUser?.profile?.name}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("profile:email")}:</strong> {loggedInUser?.email}{" "}
        {loggedInUser?.verified ? null : <strong style={{ color: "#ff0000" }}>(Not Verified)</strong>}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>User ID:</strong> <code>{loggedInUser?.id}</code>
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>Profile ID:</strong> <code>{loggedInUser?.profile.id}</code>
      </Typography>
      {loggedInUser?.profile.legacy_id ? (
        <Typography variant="body1" component="p" className="my-1">
          <strong>Legacy User ID:</strong> <code>{loggedInUser?.profile.legacy_id}</code>
        </Typography>
      ) : null}
      {loggedInUser?.profile?.isAdmin ? (
        <Typography variant="body1" component="p" className="my-1">
          <strong>Admin Account</strong>
        </Typography>
      ) : null}
      <Button variant="contained" onClick={openJSONInfo}>
        Show Raw Profile Data
      </Button>
      <JSONDialog open={showJSONInfo} setOpen={setShowJSONInfo} />
    </div>
  );
};

export default ProfileData;
