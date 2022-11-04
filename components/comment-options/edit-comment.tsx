import { Record } from "pocketbase";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
import pb from "../../src/pocketbase";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

interface IProps {
  comment: Record;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<Record[]>;
}

const EditCommentUI: React.FC<IProps> = ({ comment, open, setOpen, mutate }) => {
  const { t } = useTranslation();
  const [newMd, setNewMd] = useState(comment.markdown);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async () => {
    await pb.collection("comments").update(comment.id, {
      markdown: newMd,
      isEdited: true,
    });
    mutate();
    handleClose();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setNewMd(evt.target.value);
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("comments:actions:edit:dialog:header")}</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            autoFocus
            margin="dense"
            label={t("comments:actions:edit:dialog:label")}
            type="text"
            fullWidth
            variant="standard"
            value={newMd}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("common:cancel")}</Button>
          <Button variant="contained" onClick={handleEdit} autoFocus>
            {t("comments:actions:edit:action")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCommentUI;
