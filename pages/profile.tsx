import React from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import ***REMOVED*** userAtom ***REMOVED*** from "../src/atoms";

const Profile: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  return (
    <Layout>
      <MetaHead title="Profile | The Unus Anus Archive" />
      <h1>Profile</h1>
    </Layout>
  );
***REMOVED***;

export default Profile;
