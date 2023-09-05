import React, { useEffect, useState } from "react";
import PasswordIcon from "@mui/icons-material/VpnKey";
import { Layout } from "../components/layout";
import Button from "@mui/material/Button";
import { MetaHead } from "../components/meta-head";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import pb from "../src/pocketbase";
import LoginDialog from "../components/login-dialog";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FaDiscord } from "react-icons/fa";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FiGitlab } from "react-icons/fi";
import classNames from "classnames";
import styles from "../styles/Login.module.scss";
import { useRecoilState } from "recoil";
import { oAuthProviderAtom } from "../src/atoms";
import { siteRoot } from "../src/endpoints.json";
import { Collection, PBAuthMethodsList, PBAuthProvider } from "../src/types";
import reactStringReplace from "react-string-replace";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [oAuthProvider, setOAuthProvider] = useRecoilState(oAuthProviderAtom);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [authMethods, setAuthMethods] = useState<PBAuthMethodsList>();
  const [authMethodsLoaded, setAuthMethodsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedAuthMethods = await pb.collection(Collection.Users).listAuthMethods();

      const sortedOrder = [];

      for (let i = 0; i < fetchedAuthMethods.authProviders.length; i++) {
        const provider = fetchedAuthMethods.authProviders[i];
        switch (provider.name) {
          case "google": {
            sortedOrder[0] = provider;
            break;
          }
          case "twitter": {
            sortedOrder[1] = provider;
            break;
          }
          case "facebook": {
            sortedOrder[2] = provider;
            break;
          }
          case "discord": {
            sortedOrder[3] = provider;
            break;
          }
          case "github": {
            sortedOrder[4] = provider;
            break;
          }
          case "gitlab": {
            sortedOrder[5] = provider;
          }
        }
      }

      fetchedAuthMethods.authProviders = sortedOrder;

      setAuthMethods(fetchedAuthMethods);
      setAuthMethodsLoaded(true);
    })();
  }, []);

  const openLoginDialog = () => {
    setShowLoginDialog(true);
  };

  const oAuthIcons = {
    google: <GoogleIcon />,
    twitter: <TwitterIcon />,
    facebook: <FacebookIcon />,
    discord: <FaDiscord />,
    github: <GitHubIcon />,
    gitlab: <FiGitlab />,
  };

  const oAuthLogin = (provider: PBAuthProvider) => {
    setOAuthProvider(provider);
    location.href = provider.authUrl + `${siteRoot}/oauth2`;
  };

  return (
    <Layout>
      <MetaHead baseTitle={t("pages:login")} />
      <LoginDialog open={showLoginDialog} setOpen={setShowLoginDialog} />
      <Typography className="text-center my-2" variant="h5" component="h1">
        {t("login:header")}
      </Typography>
      <div className={classNames("d-flex flex-column justify-content-center align-items-center", styles.flexGap)}>
        {authMethodsLoaded ? (
          authMethods.usernamePassword || authMethods.emailPassword || authMethods.authProviders.length > 0 ? (
            <>
              <Button
                variant="contained"
                startIcon={<PasswordIcon />}
                onClick={openLoginDialog}
                disabled={!authMethods?.emailPassword && !authMethods?.usernamePassword}
              >
                {authMethods?.emailPassword || authMethods?.usernamePassword ? (
                  <>
                    {(authMethods?.emailPassword && authMethods?.usernamePassword) || authMethods?.emailPassword
                      ? t("login:email_password")
                      : t("login:username_password")}
                  </>
                ) : (
                  <>{t("login:password_auth_disabled")}</>
                )}
              </Button>
              {authMethods &&
                authMethods.authProviders.map((provider) => {
                  return (
                    <Button
                      className={styles[provider.name]}
                      variant="contained"
                      startIcon={oAuthIcons[provider.name]}
                      onClick={() => {
                        oAuthLogin(provider);
                      }}
                    >
                      {t("login:login_with").replace("{provider}", provider.name)}
                    </Button>
                  );
                })}
            </>
          ) : (
            <p>
              {reactStringReplace(t("login:logins_disabled"), "{link}", () => (
                <a href="https://discord.gg/PbpJz8r4Pr">{t("login:logins_disabled_link_text")}</a>
              ))}
            </p>
          )
        ) : (
          <p>{t("login:loading")}</p>
        )}
      </div>
    </Layout>
  );
};

export default LoginPage;
