import React from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import ***REMOVED*** Autoplay ***REMOVED*** from "../components/settings";
import ***REMOVED*** Link ***REMOVED*** from "@mui/material";
import reactStringReplace from "react-string-replace";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../src/atoms";
import ***REMOVED*** NextEpisodeButton ***REMOVED*** from "../components/episodes-controls";

const Settings: React.FC = () => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  const [loggedInUser] = useRecoilState(userAtom);

  const user = loggedInUser?.user;

  return (
    <Layout>
      <MetaHead baseTitle=***REMOVED***t("settings:title")***REMOVED*** />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          ***REMOVED***t("settings:title")***REMOVED***
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider
            sx=***REMOVED******REMOVED*** width: "50%", backgroundColor: "#fff" ***REMOVED******REMOVED***
            className="my-3"
          />

          ***REMOVED***user && (
            <React.Fragment>
              <Typography variant="body1" component="p">
                ***REMOVED***reactStringReplace(
                  t("settings:accountSettings"),
                  "***REMOVED***link***REMOVED***",
                  () => (
                    <Link href="/profile">
                      ***REMOVED***t("profile:title")***REMOVED*** ***REMOVED***t("common:page")***REMOVED***
                    </Link>
                  )
                )***REMOVED***
              </Typography>
              <br />
            </React.Fragment>
          )***REMOVED***

          <FormGroup>
            <Autoplay />
          </FormGroup>
        </div>
      </div>
    </Layout>
  );
***REMOVED***;

export default Settings;
