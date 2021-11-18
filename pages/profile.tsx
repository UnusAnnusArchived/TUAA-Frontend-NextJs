import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import { userAtom } from "../src/atoms";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { ProfileSection } from "../components/profile";

const Profile: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (!loggedInUser) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      router.push("/login");
    }
  }, [loggedInUser]);

  return (
    <Layout>
      <MetaHead title="Profile | The Unus Anus Archive" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          Profile
        </Typography>
        {loggedInUser && <ProfileSection />}
      </div>
    </Layout>
  );
};

export default Profile;
