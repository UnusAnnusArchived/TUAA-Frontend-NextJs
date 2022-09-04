import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";

const ProfileData: React.FC = () => {
  const [loggedInUser] = useRecoilState(userAtom);
  const { t, i18n } = useTranslation();

  const { user } = loggedInUser;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        {t("profile:dataTitle")}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("profile:username")}:</strong> {user.username}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>{t("profile:email")}:</strong> {user.email}
      </Typography>
    </div>
  );
};

export default ProfileData;
