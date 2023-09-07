import { Dialog, DialogActions, DialogContent, Typography, DialogTitle, Button, TextField } from "@mui/material";
import { IPlaylist } from "../../src/types";
import React, { useState } from "react";
import { handleDeletePlaylist } from "../../src/utils/playlistActions";
import { useRouter } from "next/router";
import { useToasts } from "@geist-ui/react";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  playlist: IPlaylist;
}

const DeletePlaylistDialog: React.FC<IProps> = ({ open, setOpen, playlist }) => {
  const router = useRouter();
  const [, setToast] = useToasts();
  const [playlistName, setPlaylistName] = useState("");

  const handleClose = () => {
    setOpen(false);
    setPlaylistName("");
  };

  const handleDelete = async () => {
    try {
      await handleDeletePlaylist(playlist.id);
      router.push("/playlist/my-playlists");
    } catch (err) {
      setToast({
        type: "error",
        text: err.toString(),
      });
    }
  };

  const handlePlaylistNameChange = (evt: any) => {
    setPlaylistName(evt.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Delete Playlist</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this playlist? The title, description, and order of all videos contained in
          the playlist will be removed.
        </Typography>
        <br />
        <Typography>
          Type "<strong>{playlist.name}</strong>" below to delete this playlist.
        </Typography>
        <TextField value={playlistName} onChange={handlePlaylistNameChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleDelete} color="error" disabled={playlistName !== playlist.name}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePlaylistDialog;
