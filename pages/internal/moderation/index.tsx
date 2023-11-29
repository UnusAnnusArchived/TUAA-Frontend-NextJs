import { Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Layout } from "../../../components/layout";
import { MetaHead } from "../../../components/meta-head";
import { userAtom } from "../../../src/atoms";

const Moderation: React.FC = () => {
  const [user] = useRecoilState(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.replace("/");
    }
  }, []);

  return (
    <Layout>
      <MetaHead baseTitle="Moderation Tools" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          Moderator Tools
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
          <Link href="/internal/moderation/remove-comments/">
            <Button variant="contained">Mass Remove Comments</Button>
          </Link>
          <br />
          <Link href="/internal/moderation/ban-account">
            <Button variant="contained">Ban Account</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Moderation;
