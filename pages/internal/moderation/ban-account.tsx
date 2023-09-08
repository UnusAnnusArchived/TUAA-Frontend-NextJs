import { Avatar, Button, Divider, Table, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "../../../components/layout";
import { MetaHead } from "../../../components/meta-head";
import { IUser } from "../../../src/types";
import pb from "../../../src/pocketbase";
import Image from "next/image";
import getPbImagePath from "../../../src/utils/getPbImagePath";
import { Close } from "@mui/icons-material";
import moment from "moment-with-locales-es6";
import DeleteUserDialog from "../../../components/delete-user-dialog";
import { useToasts } from "@geist-ui/react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../src/atoms";
import { useRouter } from "next/router";

interface IRow {
  avatar: JSX.Element;
  id: string;
  name: string;
  username: string;
  isAdmin: boolean;
  created: Date;
  actions: IUser;
}

const BanAccount: React.FC = () => {
  const [user] = useRecoilState(userAtom);
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>();
  const [rows, setRows] = useState<IRow[]>();
  const [deleteUid, setDeleteUid] = useState<string>();
  const [, setToast] = useToasts();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.replace("/");
    }
  }, []);

  const updateUserList = async () => {
    try {
      const userList = await pb.collection("users").getFullList<IUser>();
      setUsers(userList);
    } catch {
      setToast({ text: "Error loading user list!", type: "error" });
    }
  };

  useEffect(() => {
    updateUserList();
  }, []);

  useMemo(() => {
    if (users !== undefined && (users?.length ?? 0) > 0) {
      setRows(
        users.map((user) => {
          return {
            avatar: (
              <Avatar
                sx={{ width: 36, height: 36 }}
                src={getPbImagePath(user.collectionId, user.id, user.avatar, 72, 72)}
                alt={user.name}
              >
                {user.name.substring(0, 1)}
              </Avatar>
            ),
            id: user.id,
            name: user.name,
            username: user.username,
            isAdmin: user.isAdmin,
            created: new Date(user.created),
            actions: user,
          };
        })
      );
    }
  }, [users]);

  const showDeletePopup = (uid: string) => {
    setDeleteUid(uid);
  };

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 60,
      renderCell: (params) => {
        return <div style={{ width: "100%", textAlign: "center" }}>{params.value}</div>;
      },
    },
    {
      field: "id",
      headerName: "ID",
      width: 148,
    },
    {
      field: "name",
      headerName: "Name",
      width: 256,
    },
    {
      field: "username",
      headerName: "Username",
      width: 256,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      type: "boolean",
      width: 72,
    },
    {
      field: "created",
      headerName: "Created On",
      type: "date",
      width: 256,
      renderCell: (params) => {
        return <Typography>{moment.utc(params.value).fromNow()}</Typography>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 82,
      sortable: false,
      renderCell: (params) => {
        return (
          <Tooltip title={params.value.isAdmin ? "Cannot ban an admin!" : undefined} placement="top">
            <span>
              <Button
                variant="contained"
                disabled={params.value.isAdmin}
                onClick={() => {
                  showDeletePopup(params.value.id);
                }}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgb(209, 26, 42)",
                  textTransform: "none",
                  ":hover": { color: "#ffffff", backgroundColor: "rgb(172, 26, 42)" },
                }}
              >
                Ban
              </Button>
            </span>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Layout>
      <MetaHead baseTitle="Ban Account" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          Ban Account
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
          <div style={{ width: "100%", height: "75vh" }}>
            {columns && (columns?.length ?? 0) > 0 && <DataGrid columns={columns ?? []} rows={rows ?? []} />}
          </div>
        </div>
      </div>
      <DeleteUserDialog uid={deleteUid} setUid={setDeleteUid} updateUserList={updateUserList} />
    </Layout>
  );
};

export default BanAccount;
