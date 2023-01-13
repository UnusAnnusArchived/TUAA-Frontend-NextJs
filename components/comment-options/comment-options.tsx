import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PencilIcon from "@mui/icons-material/Edit";
import TrashIcon from "@mui/icons-material/Delete";
import { IconButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Record } from "pocketbase";
import { useToasts } from "@geist-ui/react";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
import DeleteCommentUI from "./delete-comment";
import EditCommentUI from "./edit-comment";
import { useTranslation } from "react-i18next";

interface IProps {
  comment: Record;
  commentUser: Record;
  mutate: KeyedMutator<Record[]>;
}

const CommentOptions: React.FC<IProps> = ({ comment, commentUser, mutate }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showEditCommentUI, setShowEditCommentUI] = useState(false);
  const [showDeleteCommentUI, setShowDeleteCommentUI] = useState(false);
  const open = Boolean(anchorEl);

  const [, setToast] = useToasts();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openEditCommentUI = () => {
    setShowEditCommentUI(true);
    handleClose();
  };

  const openDeleteCommentUI = () => {
    setShowDeleteCommentUI(true);
    handleClose();
  };

  return commentUser.id === comment.user ? (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="menu-container">
          <MenuItem onClick={openEditCommentUI}>
            <ListItemIcon>
              <PencilIcon />
            </ListItemIcon>
            <ListItemText>{t("comments:actions:edit:action")}</ListItemText>
          </MenuItem>
          <MenuItem onClick={openDeleteCommentUI}>
            <ListItemIcon>
              <TrashIcon />
            </ListItemIcon>
            <ListItemText>{t("comments:actions:delete:action")}</ListItemText>
          </MenuItem>
        </div>
      </Menu>

      <DeleteCommentUI comment={comment} open={showDeleteCommentUI} setOpen={setShowDeleteCommentUI} mutate={mutate} />
      <EditCommentUI comment={comment} open={showEditCommentUI} setOpen={setShowEditCommentUI} mutate={mutate} />
    </>
  ) : null;
};

export default CommentOptions;
