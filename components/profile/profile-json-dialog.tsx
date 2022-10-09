import { useToasts } from "@geist-ui/react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JSONDialog: React.FC<IProps> = ({ open, setOpen }) => {
  const [loggedInUser] = useRecoilState(userAtom);
  const [user, setUser] = useState(null);
  const [, setToast] = useToasts();

  useEffect(() => {
    pb.users
      .getOne(loggedInUser?.id, {
        $autoCancel: false,
      })
      .then((fetchedUser) => {
        setUser(fetchedUser);
      });
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    setToast({
      text: "Copied text to clipboard",
    });
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Raw Profile Data</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          autoFocus
          margin="dense"
          label="Raw Profile Data"
          type="text"
          fullWidth
          variant="outlined"
          value={JSON.stringify(user, null, 2)}
          spellCheck={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={copy}>Copy</Button>
        <Button variant="contained" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JSONDialog;
