import React from "react";
import { useRecoilState } from "recoil";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import { userAtom } from "../src/atoms";

const Profile: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  return (
    <Layout>
      <MetaHead title="Profile | The Unus Anus Archive" />
      <h1>Profile</h1>
    </Layout>
  );
};

export default Profile;
