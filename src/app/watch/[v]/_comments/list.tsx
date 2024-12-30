import pb from "@/pb/server";
import { Collection, Comment, User, WithExpand } from "@/types";
import { IMetadata } from "@/zodTypes";
import CommentItem from "./commentItem";

interface IProps {
  video: IMetadata;
}

const CommentList: React.FC<IProps> = async ({ video }) => {
  const comments = await pb.collection(Collection.Comments).getFullList<WithExpand<Comment, { user: User }>>({
    filter: `episode="${video.uaid}"`,
    expand: "user",
    sort: "-created",
  });

  return (
    <>
      {comments.map((comment) => {
        return <CommentItem comment={comment} video={video} />;
      })}
    </>
  );
};

export default CommentList;
