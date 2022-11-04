import { useToasts } from "@geist-ui/react";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import pb from "../../src/pocketbase";
import DeleteAccountDialog from "./delete-account-dialog";

const Logout: React.FC = () => {
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [, setToast] = useToasts();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const logout = async () => {
    try {
      pb.authStore.clear();
      setLoggedInUser(null);
      setLoggedInUser(null);
      router.push("/");
      setToast({
        type: "success",
        text: t("profile:logout:success"),
      });
    } catch (error) {
      setToast({ type: "error", text: error.message ?? error.code });
    }
  };

  const openDeleteAccountDialog = () => {
    setShowDeleteAccountDialog(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column flex-md-row justify-content-center">
        <Button variant="contained" onClick={logout} className="mx-3 my-2 my-md-1">
          {t("profile:logout:action")}
        </Button>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-center">
        <Button
          variant="contained"
          onClick={openDeleteAccountDialog}
          className="mx-3 my-2 my-md-1"
          style={{ backgroundColor: "#D11A2A", color: "#ffffff" }}
        >
          {t("profile:delete:action")}
        </Button>
      </div>
      <DeleteAccountDialog open={showDeleteAccountDialog} setOpen={setShowDeleteAccountDialog} />
    </div>
  );
};

export default Logout;
