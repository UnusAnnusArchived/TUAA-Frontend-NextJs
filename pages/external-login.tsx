import { useRouter } from "next/router";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import { useRecoilState } from "recoil";
import { userAtom } from "../src/atoms";
import { useTheme } from "@mui/styles";
import { Button, Paper, Theme, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import { previousPageAtom } from "../src/atoms";

const ExternalLogin: React.FC = () => {
  const [currentUser] = useRecoilState(userAtom);
  const [_, setPreviousPageAtom] = useRecoilState(previousPageAtom);
  const theme = useTheme<Theme>();
  const router = useRouter();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const loginBtn = useRef<HTMLInputElement>();

  if (router.query.redirectUrl && typeof router.query.redirectUrl === "string") {
    try {
      new URL(router.query.redirectUrl);
    } catch {
      return <h1 style={{ color: "#ffffff" }}>redirectUrl param is not a valid URL!</h1>;
    }
    if (currentUser) {
      // useEffect(() => {
      //   loginBtn.current.click();
      // }, [loginBtn]);
      const url = new URL(router.query.redirectUrl);
      const imageUrl =
        router.query.imageUrl && typeof router.query.imageUrl === "string"
          ? router.query.imageUrl
          : router.query.imageUrl[0];
      const appName = router.query.appName ?? url.hostname;

      const handleLogin = (canceled: boolean = false) => {
        // Create form with userinfo and redirect browser to POST the redirectUrl
        const form = document.createElement("form");
        form.action = router.query.redirectUrl as string;
        form.method = "post";
        form.style.display = "none";
        const userInfo = document.createElement("input");
        userInfo.type = "hidden";
        userInfo.name = "token";
        userInfo.value = canceled ? "canceled" : JSON.parse(localStorage.getItem("pocketbase_auth")).token;
        form.appendChild(userInfo);
        const submit = document.createElement("input");
        submit.type = "submit";
        form.appendChild(submit);
        document.body.appendChild(form);
        submit.click();
      };

      return (
        <>
          <Layout>
            <MetaHead baseTitle="External Login" />
            <div style={{ textAlign: "center" }}>
              <Paper
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                  maxWidth: isMdDown ? "100%" : "500px",
                }}
              >
                {imageUrl && <img style={{ width: 60, borderRadius: "100%", margin: 8 }} src={imageUrl} />}
                <Typography variant="h6" component="h2">
                  <b>{appName}</b> wants to access your account
                </Typography>

                <Typography>This will allow this app to have full access to your account!</Typography>
                <br />
                <Typography>
                  We will send your account information to <code>{router.query.redirectUrl}</code>. If you do not
                  recognize this website, please{" "}
                  <a href="mailto:contact@unusann.us" target="_blank">
                    report the website to us
                  </a>{" "}
                  and close this tab.
                </Typography>
                <br />
                <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: 8 }}>
                  <Button
                    onClick={() => {
                      handleLogin(true);
                    }}
                    variant="text"
                    sx={{ flexGrow: 1 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleLogin();
                    }}
                    variant="contained"
                    sx={{ flexGrow: 1 }}
                  >
                    Allow
                  </Button>
                </div>
              </Paper>
            </div>
          </Layout>
        </>
      );
    } else {
      setPreviousPageAtom(`/external-login?redirectUrl=${router.query.redirectUrl}`);
      router.push("/login");
      return <></>;
    }
  } else {
    return <h1 style={{ color: "#ffffff" }}>Invalid or no redirectUrl param!</h1>;
  }
};

export default ExternalLogin;
