import { Layout } from "@/types";
import type { Metadata } from "next";
import ThemeRegistry from "$/ThemeRegistry";
import AppBar from "$/AppBar";
import { Typography } from "@mui/material";
import AppBarMargin from "$/AppBar/margin";
import RecoilRoot from "$/RecoilRoot";
import GeistProvider from "$/GeistProdivder";
import { userServerTranslation, useClientTranslation } from "@/hooks/useTranslation";
import useIsServer from "@/hooks/useIsServer";
import ScrollHelper from "@/components/ScrollHelper";

export const metadata: Metadata = {
  title: "The Unus Annus Archive",
};

const Layout: Layout = async ({ children }) => {
  const [t] = await userServerTranslation();

  return (
    <html lang={t.language.code}>
      <body style={{ overflow: "hidden" }}>
        <GeistProvider>
          <RecoilRoot>
            <ThemeRegistry>
              <div id="root">
                <ScrollHelper>
                  <AppBar />
                  <AppBarMargin />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "32px 16px 32px 16px",
                    }}
                  >
                    <noscript>
                      <Typography sx={{ textAlign: "center" }} variant="h3" component="h2">
                        Please enable JavaScript!
                      </Typography>
                    </noscript>
                    {children}
                  </div>
                </ScrollHelper>
              </div>
            </ThemeRegistry>
          </RecoilRoot>
        </GeistProvider>
      </body>
    </html>
  );
};

export default Layout;
