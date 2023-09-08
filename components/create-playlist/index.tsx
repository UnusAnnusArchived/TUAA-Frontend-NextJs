import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  continueButtonText?: string;
  initialName?: string;
  initialDescription?: string;
  initialPublic?: boolean;
  handleResult: HandleCreatePlaylist;
}

export type HandleCreatePlaylist = (
  name: string,
  description: string,
  isPublic: boolean,
  handleClose: () => void
) => Promise<void>;

const CreatePlaylist: React.FC<IProps> = ({
  open,
  setOpen,
  title,
  continueButtonText,
  initialName,
  initialDescription,
  initialPublic,
  handleResult,
}) => {
  const [name, setName] = useState(initialName ?? "");
  const [description, setDescription] = useState(initialDescription ?? "");
  const [isPublic, setIsPublic] = useState(initialPublic ?? false);

  const handleClose = () => {
    setOpen(false);
    setName(initialName ?? "");
    setDescription(initialDescription ?? "");
    setIsPublic(initialPublic ?? false);
  };

  const handleContinue = () => {
    handleResult(name, description, isPublic, handleClose);
  };

  const handleNameChange = (evt: any) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt: any) => {
    setDescription(evt.target.value);
  };

  const handleIsPublicChange = (evt: any) => {
    setIsPublic(evt.target.checked);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title ? title : "Create Playlist"}</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <TextField label="Name" value={name} onChange={handleNameChange} />
          <TextField label="Description (optional)" value={description} onChange={handleDescriptionChange} multiline />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <FormControlLabel
              control={<Switch onChange={handleIsPublicChange} checked={isPublic} />}
              label="Public"
              labelPlacement="start"
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleContinue} disabled={name === ""}>
          {continueButtonText ?? "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylist;
