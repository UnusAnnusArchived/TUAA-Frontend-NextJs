import React, ***REMOVED*** useEffect ***REMOVED*** from "react";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import ***REMOVED*** userAtom ***REMOVED*** from "../src/atoms";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import Typography from "@mui/material/Typography";
import ***REMOVED*** ProfileSection ***REMOVED*** from "../components/profile";

const Profile: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const router = useRouter();

  useEffect(() => ***REMOVED***
    if (!loggedInUser) ***REMOVED***
      router.push("/login");
***REMOVED***
***REMOVED*** []);

  useEffect(() => ***REMOVED***
    if (!loggedInUser) ***REMOVED***
      router.push("/login");
***REMOVED***
***REMOVED*** [loggedInUser]);

  return (
    <Layout>
      <MetaHead title="Profile | The Unus Anus Archive" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          Profile
        </Typography>
        ***REMOVED***loggedInUser && <ProfileSection />***REMOVED***
      </div>
    </Layout>
  );
***REMOVED***;

export default Profile;
