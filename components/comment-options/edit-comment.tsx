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

interface IProps {
  comment: Record;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<Record[]>;
}

const EditCommentUI: React.FC<IProps> = ({ comment, open, setOpen, mutate }) => {
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
        <DialogTitle id="alert-dialog-title">Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={newMd}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCommentUI;
