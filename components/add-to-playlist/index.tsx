import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  Radio,
  RadioGroup,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import endpoints from "../../src/endpoints.json";
import { Collection, IPlaylist } from "../../src/types";
import pb from "../../src/pocketbase";
import ListItem from "./listItem";
import { useToasts } from "@geist-ui/react";
import { addVideoToPlaylist } from "../../src/utils/playlistActions";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";

interface IProps {
  videoId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreatePlaylist: () => void;
}

const AddToPlaylist: React.FC<IProps> = ({ videoId, open, setOpen, handleCreatePlaylist }) => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>();
  const [currentUser] = useRecoilState(userAtom);
  const [, setToast] = useToasts();

  useEffect(() => {
    (async () => {
      const playlists = await pb.collection(Collection.UserPlaylists).getFullList<IPlaylist>();
      setPlaylists(playlists);
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedPlaylistId(undefined);
    // We don't reset imgLoaded here because images do not call onLoad when this dialog is reopened
  };

  const handleAdd = async () => {
    if (selectedPlaylistId === "create") {
      handleClose();
      handleCreatePlaylist();
    } else {
      try {
        await addVideoToPlaylist(currentUser, videoId, selectedPlaylistId);
        setToast({
          type: "success",
          text: "Added video to playlist!",
        });
        handleClose();
      } catch (err) {
        setToast({
          type: "error",
          text: err.toString(),
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add To Playlist</DialogTitle>
      <DialogContent>
        <Typography>Please select a playlist to add this video to.</Typography>
        <List>
          <RadioGroup value={selectedPlaylistId}>
            {playlists.map((playlist, i) => {
              if (!playlist.isFavorites) {
                return (
                  <ListItem
                    selectedPlaylistId={selectedPlaylistId}
                    setSelectedPlaylistId={setSelectedPlaylistId}
                    playlist={playlist}
                    key={playlist.id}
                  />
                );
              }
            })}
            <ListItem
              selectedPlaylistId={selectedPlaylistId}
              setSelectedPlaylistId={setSelectedPlaylistId}
              playlist={
                {
                  id: "create",
                  name: "Create Playlist",
                } as IPlaylist
              }
              isAddPlaylist
            />
          </RadioGroup>
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleAdd} variant="contained" disabled={!selectedPlaylistId}>
          {selectedPlaylistId === "create" ? "Create" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToPlaylist;
