import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";

const ResetProfile: React.FC = () => {
  const [loggedInUser] = useRecoilState(userAtom);
  const [emailChangeDialog, setEmailChangeDialog] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [sentPassword, setSentPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const resetEmail = async () => {
    await pb.users.requestEmailChange(newEmail);
    closeEmailChangeDialog();
  };

  const resetPassword = async () => {
    await pb.users.requestPasswordReset(loggedInUser?.email);
    setSentPassword(true);
  };

  const openEmailChangeDialog = () => {
    setEmailChangeDialog(true);
  };

  const closeEmailChangeDialog = () => {
    setEmailChangeDialog(false);
    setSentEmail(true);
  };

  const onNewEmailChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setNewEmail(evt.target.value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        Reset
      </Typography>
      <Button style={{ marginBottom: 5 }} variant="contained" onClick={openEmailChangeDialog} disabled={sentEmail}>
        {sentEmail ? "Sent Email Reset" : "Send Email Reset"}
      </Button>
      <Button style={{ marginTop: 5 }} variant="contained" onClick={resetPassword} disabled={sentPassword}>
        {sentPassword ? "Sent Password Reset" : "Send Password Reset"}
      </Button>

      <Dialog
        fullWidth
        open={emailChangeDialog}
        onClose={closeEmailChangeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Email</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            autoFocus
            margin="dense"
            label="New Email"
            type="email"
            fullWidth
            variant="standard"
            value={newEmail}
            onChange={onNewEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEmailChangeDialog}>Cancel</Button>
          <Button variant="contained" onClick={resetEmail} autoFocus>
            Send Confirmation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResetProfile;
