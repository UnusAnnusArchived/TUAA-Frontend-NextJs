import Typography from "@mui/material/Typography";
import React from "react";
import useSWR from "swr";
import ***REMOVED*** IComment ***REMOVED*** from "../../src/types";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** AddComment, CommentItem ***REMOVED*** from ".";

interface IProps ***REMOVED***
  watchCode: string;
***REMOVED***

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CommentList: React.FC<IProps> = (***REMOVED*** watchCode ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** data, mutate, isValidating, error ***REMOVED*** = useSWR<IComment[], any>(
    `$***REMOVED***endpoint***REMOVED***/api/v2/comments/get/$***REMOVED***watchCode***REMOVED***`,
    fetcher
  );

  const onAdded = async () => ***REMOVED***
    mutate();
***REMOVED***;

  return (
    <div>
      <Typography variant="h6" component="h2">
        Comments
      </Typography>
      <AddComment watchCode=***REMOVED***watchCode***REMOVED*** onComment=***REMOVED***onAdded***REMOVED*** />
      ***REMOVED***error && <Typography>Comments failed to load</Typography>***REMOVED***
      ***REMOVED***data && data.length < 1 && (
        <Typography>There are no comments</Typography>
      )***REMOVED***
      ***REMOVED***data &&
        data.length > 0 &&
        data.map((comment, i) => (
          <div key=***REMOVED***i***REMOVED***>
            <CommentItem comment=***REMOVED***comment***REMOVED*** />
          </div>
        ))***REMOVED***
    </div>
  );
***REMOVED***;

export default CommentList;
