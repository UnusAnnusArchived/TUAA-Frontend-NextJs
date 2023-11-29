import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { Layout } from "../../../components/layout";
import { MetaHead } from "../../../components/meta-head";
import { userAtom } from "../../../src/atoms";
import { IComment, IUser } from "../../../src/types";
import pb from "../../../src/pocketbase";
import { useToasts } from "@geist-ui/react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Button, Chip, Divider, Tooltip, Typography } from "@mui/material";
import getPbImagePath from "../../../src/utils/getPbImagePath";
import moment from "moment-with-locales-es6";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import mdIterator from "markdown-it-for-inline";
import styles from "../../../styles/RemoveComments.module.scss";
import EditCommentUI from "../../../components/comment-options/edit-comment";

const md = MarkdownIt({ html: false, xhtmlOut: false, breaks: true, langPrefix: "", linkify: true })
  .disable(["image", "link"])
  .use(mdIterator, "url_new_win", "link_open", (tokens, idx) => {
    const [, href] = tokens[idx].attrs.find((attr) => attr[0] === "href");

    if (href) {
      tokens[idx].attrPush(["target", "_blank"]);
      tokens[idx].attrPush(["rel", "noopener noreferrer"]);
    }
  });

const markdownToHTML = (markdown: string, episode: string) => {
  const timeReg = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/g;

  let html = md.render(markdown);

  const matches = markdown.match(timeReg);

  for (let i = 0; i < matches?.length ?? 0; i++) {
    const split = matches[i].split(":");
    let seconds = parseInt(split[split.length - 1]);
    seconds += parseInt(split[split.length - 2]) * 60;
    if (split.length === 3) {
      seconds += parseInt(split[0]) * 60 * 60;
    }

    html = html.replace(
      matches[i],
      `<a href="/watch/${episode}?t=${seconds}">${matches[i].replace(/:/g, "&colon;")}</a>`
    );
  }

  return html;
};

interface IRow {
  user: string;
  id: string;
  episodeId: string;
  season: number;
  episode: number;
  markdown: string;
  isEdited: boolean;
  created: Date;
}

const RemoveComments: React.FC = () => {
  const [user] = useRecoilState(userAtom);
  const router = useRouter();
  const [, setToast] = useToasts();
  const [comments, setComments] = useState<IComment[]>();
  const [rows, setRows] = useState<IRow[]>();
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [editDialogComment, setEditDialogComment] = useState<IComment>();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.replace("/");
    }
  }, []);

  const updateCommentsList = async () => {
    try {
      const comments = await pb.collection("comments").getFullList<IComment>();
      setComments(comments);
    } catch {
      setToast({ text: "Error loading comments list!", type: "error" });
    }
  };

  useEffect(() => {
    updateCommentsList();
  }, []);

  useMemo(() => {
    if (comments !== undefined && (comments?.length ?? 0) > 0) {
      setRows(
        comments.map((comment) => {
          return {
            user: comment.user,
            id: comment.id,
            episodeId: comment.episode,
            season: parseInt(comment.episode.substring(1, 3)),
            episode: parseInt(comment.episode.substring(5)),
            markdown: comment.markdown,
            isEdited: comment.isEdited,
            created: new Date(comment.created),
            actions: comment,
          };
        })
      );
    }
  }, [comments]);

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "User",
      width: 196,
      renderCell: (params) => {
        const [user, setUser] = useState<IUser>();

        useEffect(() => {
          (async () => {
            const user = await pb.collection("users").getOne<IUser>(params.value);
            setUser(user);
          })();
        }, []);

        return (
          <Chip
            label={user?.name ?? "Loading User..."}
            avatar={
              <Avatar src={getPbImagePath(user?.collectionId, user?.id, user?.avatar)} alt={user?.name}>
                {user?.name?.substring?.(0, 1)}
              </Avatar>
            }
          />
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      width: 148,
    },
    {
      field: "episodeId",
      headerName: "Episode ID",
      renderCell: (params) => {
        return (
          <Link href={`/watch/${params.value}`}>
            <a target="_blank">
              <Typography>{params.value}</Typography>
            </a>
          </Link>
        );
      },
    },
    {
      field: "season",
      headerName: "Season",
    },
    {
      field: "episode",
      headerName: "Episode",
    },
    {
      field: "markdown",
      headerName: "Comment Markdown",
      width: 380,
      renderCell: (params) => {
        return (
          <Tooltip
            title={
              <span dangerouslySetInnerHTML={{ __html: markdownToHTML(params.value, params.row.episodeId) }}></span>
            }
            placement="bottom-start"
            classes={{ popper: styles.popper }}
          >
            <Typography>{params.value}</Typography>
          </Tooltip>
        );
      },
    },
    {
      field: "isEdited",
      headerName: "Edited",
      type: "boolean",
      width: 72,
    },
    {
      field: "created",
      headerName: "Commented On",
      type: "date",
      width: 128,
      renderCell: (params) => {
        return <Typography>{moment.utc(params.value).fromNow()}</Typography>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 82,
      renderCell: (params) => {
        return (
          <Tooltip title={params.value.isAdmin ? "Cannot edit a comment from an admin!" : undefined} placement="top">
            <span>
              <Button
                variant="contained"
                disabled={params.value.isAdmin}
                onClick={() => {
                  setEditDialogComment(params.value);
                  setShowEditCommentDialog(true);
                }}
              >
                Edit
              </Button>
            </span>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Layout>
      <MetaHead baseTitle="Mass Remove Comments" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          Mass Remove Comments
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
          <div style={{ width: "100%", height: "75vh" }}>
            {columns && (columns?.length ?? 0) > 0 && (
              <DataGrid checkboxSelection disableSelectionOnClick columns={columns ?? []} rows={rows ?? []} />
            )}
          </div>
        </div>
      </div>
      <EditCommentUI
        comment={editDialogComment}
        open={showEditCommentDialog}
        setOpen={setShowEditCommentDialog}
        mutate={updateCommentsList}
      />
    </Layout>
  );
};

export default RemoveComments;
