import {
  Avatar,
  AvatarGroup,
  Button,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IUser } from "../../src/types";
import pb from "../../src/pocketbase";
import getPbImagePath from "../../src/utils/getPbImagePath";
import { useToasts } from "@geist-ui/react";

interface IProps {
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
  updateUserList: () => Promise<void>;
}

const DeleteUserDialog: React.FC<IProps> = ({ uid, setUid, updateUserList }) => {
  const [user, setUser] = useState<IUser>();
  const [, setToast] = useToasts();

  useEffect(() => {
    (async () => {
      if (uid) {
        const user = await pb.collection("users").getOne<IUser>(uid);

        setUser(user);
      } else {
        setUser(undefined);
      }
    })();
  }, [uid]);

  const handleClose = () => {
    setUid(undefined);
  };

  const handleDelete = async () => {
    pb.collection("users").delete(uid);
    await updateUserList();
    handleClose();
    setToast({ text: `Successfully banned ${user.name}`, type: "success" });
  };

  return (
    <Dialog open={uid !== undefined} onClose={handleClose}>
      <DialogTitle>Ban User?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>Are you sure you would like to ban the following user:</Typography>
          <Chip
            avatar={
              <Avatar src={getPbImagePath(user?.collectionId, user?.id, user?.avatar)} alt={user?.name}>
                {user?.name?.substring?.(0, 1)}
              </Avatar>
            }
            label={user?.name ?? "Loading User..."}
            sx={{ marginTop: "8px" }}
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              color: "#ffffff",
              backgroundColor: "rgb(209, 26, 42)",
              textTransform: "none",
              ":hover": { color: "#ffffff", backgroundColor: "rgb(172, 26, 42)" },
            }}
          >
            Ban
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
