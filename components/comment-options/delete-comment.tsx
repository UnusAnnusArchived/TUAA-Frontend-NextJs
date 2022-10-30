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

interface IProps {
  comment: Record;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<Record[]>;
}

const DeleteCommentUI: React.FC<IProps> = ({ comment, open, setOpen, mutate }) => {
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
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete your comment?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete your comment? This can not be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            style={{ backgroundColor: "#D11A2A", color: "#ffffff" }}
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCommentUI;
