import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import { Autoplay } from "../components/settings";
import { Link } from "@mui/material";
import reactStringReplace from "react-string-replace";
import { useRecoilState } from "recoil";
import { userAtom } from "../src/atoms";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [loggedInUser] = useRecoilState(userAtom);

  return (
    <Layout>
      <MetaHead baseTitle={t("settings:title")} />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          {t("settings:title")}
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />

          {loggedInUser && (
            <React.Fragment>
              <Typography variant="body1" component="p">
                {reactStringReplace(t("settings:accountSettings"), "{link}", () => (
                  <Link href="/profile">
                    {t("profile:title")} {t("common:page")}
                  </Link>
                ))}
              </Typography>
              <br />
            </React.Fragment>
          )}

          <FormGroup>
            <Autoplay />
          </FormGroup>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
