import { useToasts } from "@geist-ui/react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JSONDialog: React.FC<IProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [loggedInUser] = useRecoilState(userAtom);
  const [user, setUser] = useState(null);
  const [, setToast] = useToasts();

  useEffect(() => {
    (async () => {
      const fetchedUser = await pb.collection("users").getOne(loggedInUser?.id);

      setUser(fetchedUser);
    })();
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    setToast({
      text: t("common:copied_toast"),
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
      <DialogTitle id="alert-dialog-title">{t("profile:data:json_info:header")}</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          autoFocus
          margin="dense"
          label={t("profile:data:json_info:header")}
          type="text"
          fullWidth
          variant="outlined"
          value={JSON.stringify(user, null, 2)}
          spellCheck={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={copy}>{t("common:copy")}</Button>
        <Button variant="contained" onClick={close}>
          {t("common:close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JSONDialog;
