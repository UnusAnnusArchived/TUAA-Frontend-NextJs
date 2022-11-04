import { Record } from "pocketbase";
import React from "react";
import { KeyedMutator } from "swr";
import pb from "../../src/pocketbase";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

interface IProps {
  comment: Record;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<Record[]>;
}

const DeleteCommentUI: React.FC<IProps> = ({ comment, open, setOpen, mutate }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await pb.collection("comments").delete(comment.id);
    mutate();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("comments:actions:delete:dialog:header")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("comments:actions:delete:dialog:description")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("common:cancel")}</Button>
          <Button
            style={{ backgroundColor: "#D11A2A", color: "#ffffff" }}
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            {t("comments:actions:delete:dialog:action")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCommentUI;
