import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** PostCommentResponse ***REMOVED*** from "../../src/types";
import LoadingButton from "@mui/lab/LoadingButton";

interface IProps ***REMOVED***
  watchCode: string;
  onComment: () => Promise<void>;
***REMOVED***

const AddComment: React.FC<IProps> = (***REMOVED*** watchCode, onComment: onC ***REMOVED***) => ***REMOVED***
  const [comment, setComment] = useState("");
  const [loggedInUser,] = useRecoilState(userAtom);
  const [isSendingComment, setIsSendingComment] = useState(false);

  const onComment = async () => ***REMOVED***
    const commentText = comment.trim();

    if (commentText.length === 0) ***REMOVED***
      return;
***REMOVED***

    setIsSendingComment(true);
    try ***REMOVED***
      const res = await axios.post<PostCommentResponse>(
        `$***REMOVED***endpoint***REMOVED***/api/v2/comments/post/$***REMOVED***watchCode***REMOVED***`,
        ***REMOVED*** loginKey: loggedInUser.loginKey, comment: commentText ***REMOVED***
      );

      if (res.data.status === "success") ***REMOVED***
        setComment("");
        await onC();
  ***REMOVED***
***REMOVED*** catch (e) ***REMOVED***
      console.error(e);
***REMOVED***

    setIsSendingComment(false);
***REMOVED***;

  if (!loggedInUser) ***REMOVED***
    return (
      <div className="my-2">
        <Typography>You need to login to comment on this video</Typography>
        <Divider className="my-2 mt-4" sx=***REMOVED******REMOVED*** backgroundColor: "#fff" ***REMOVED******REMOVED*** />
      </div>
    );
***REMOVED***

  return (
    <div className="mt-1">
      <div className="d-flex flex-row flex-md-row flex-column">
        <div className="flex-grow">
          <TextField
            variant="standard"
            fullWidth
            label="Add a public comment"
            id="comment-text"
            name="comment-text"
            autoComplete="off"
            placeholder=""
            className="mx-1"
            value=***REMOVED***comment***REMOVED***
            onChange=***REMOVED***(e) => setComment(e.currentTarget.value)***REMOVED***
          />
        </div>
        <div className="mx-4 text-center mt-3 mt-md-0">
          <LoadingButton
            variant="contained"
            loading=***REMOVED***isSendingComment***REMOVED***
            disabled=***REMOVED***comment.trim().length < 1 || isSendingComment***REMOVED***
            onClick=***REMOVED***onComment***REMOVED***
          >
            Comment
          </LoadingButton>
        </div>
      </div>
      <Divider className="my-2 mt-4" sx=***REMOVED******REMOVED*** backgroundColor: "#fff" ***REMOVED******REMOVED*** />
    </div>
  );
***REMOVED***;

export default AddComment;
