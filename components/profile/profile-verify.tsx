import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";
import { Collection } from "../../src/types";

const VerifyProfile: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser] = useRecoilState(userAtom);
  const [sent, setSent] = useState(false);

  const handleClick = () => {
    pb.collection(Collection.Users).requestVerification(loggedInUser?.email);
    setSent(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        {t("profile:verify:header")}
      </Typography>
      <Button variant="contained" onClick={handleClick} disabled={sent}>
        {sent ? t("profile:verify:action_disabled") : t("profile_verify_action")}
      </Button>
    </div>
  );
};

export default VerifyProfile;
