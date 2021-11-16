import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React from "react";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** IComment ***REMOVED*** from "../../src/types";

interface IProps ***REMOVED***
  comment: IComment;
***REMOVED***

const CommentItem: React.FC<IProps> = (***REMOVED*** comment ***REMOVED***) => ***REMOVED***
  return (
    <div>
      <div className="row my-2">
        <div className="col-2 col-md-1 mb-md-0 my-1 d-flex flex-column align-items-center justify-content-center">
          <Avatar
            alt=***REMOVED***comment.user.username***REMOVED***
            src=***REMOVED***`$***REMOVED***endpoint***REMOVED***$***REMOVED***comment.user.pfp.filename***REMOVED***`***REMOVED***
            sx=***REMOVED******REMOVED*** width: 56, height: 56 ***REMOVED******REMOVED***
          />
        </div>
        <div className="col-10 col-md-11 mb-md-0 my-1 d-flex flex-column justify-content-center">
          <div className="d-flex align-items-baseline">
            <Typography variant="body1" className="font-weight-bold">
              <strong>***REMOVED***comment.user.username***REMOVED***</strong>
            </Typography>
            &nbsp;
            <Typography variant="body2" sx=***REMOVED******REMOVED*** color: "#a3a3a3" ***REMOVED******REMOVED***>
              ***REMOVED***moment(new Date(comment.stats.published)).fromNow()***REMOVED***
            </Typography>
          </div>
          <Typography>***REMOVED***comment.comment.plaintext***REMOVED***</Typography>
        </div>
      </div>
      <Divider sx=***REMOVED******REMOVED*** backgroundColor: "#fff" ***REMOVED******REMOVED*** />
    </div>
  );
***REMOVED***;

export default CommentItem;
