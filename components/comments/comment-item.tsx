import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React from "react";
import { endpoint } from "../../src/endpoints";
import { IComment } from "../../src/types";

interface IProps {
  comment: IComment;
}

const CommentItem: React.FC<IProps> = ({ comment }) => {
  return (
    <div>
      <div className="row my-2">
        <div className="col-2 col-md-1 mb-md-0 my-1 d-flex flex-column align-items-center justify-content-center">
          <Avatar
            alt={comment.user.username}
            src={`${endpoint}${comment.user.pfp.filename}`}
            sx={{ width: 56, height: 56 }}
          />
        </div>
        <div className="col-10 col-md-11 mb-md-0 my-1 d-flex flex-column justify-content-center">
          <div className="d-flex align-items-baseline">
            <Typography variant="body1" className="font-weight-bold">
              <strong>{comment.user.username}</strong>
            </Typography>
            &nbsp;
            <Typography variant="body2" sx={{ color: "#a3a3a3" }}>
              {moment(new Date(comment.stats.published)).fromNow()}
            </Typography>
          </div>
          <Typography dangerouslySetInnerHTML={{ __html: comment.comment.html }} />
        </div>
      </div>
      <Divider sx={{ backgroundColor: "#fff" }} />
    </div>
  );
};

export default CommentItem;
