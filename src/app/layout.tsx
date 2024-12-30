import { Layout as ILayout } from "@/types";
import type { Metadata } from "next";
import ThemeRegistry from "$/ThemeRegistry";
import AppBar from "$/AppBar";
import { Typography } from "@mui/material";
import AppBarMargin from "$/AppBar/margin";
import RecoilRoot from "$/RecoilRoot";
import GeistProvider from "$/GeistProdivder";
import ScrollHelper from "@/components/ScrollHelper";
import { cookies as useCookies } from "next/headers";
import { TolgeeNextProvider } from "@/tolgee/client";
import { ALL_LOCALES, getStaticData } from "@/tolgee/shared";
import { headers as useHeaders } from "next/headers";
import Negotiator from "negotiator";
import { Container } from "@mui/system";
import "./styles.scss";

export const metadata: Metadata = {
  title: "The Unus Annus Archive",
};

const Layout: ILayout = async ({ children }) => {
  const cookies = useCookies();
  const headers = useHeaders();

  let lang = cookies.get("lang")?.value;

  if (!lang) {
    // Negotiate language
    const acceptLanguageHeader = headers.get("Accept-Language") ?? "en-US,en;q=0.9";
    const negotiator = new Negotiator({ headers: { "accept-language": acceptLanguageHeader } });

    lang = negotiator.language(ALL_LOCALES) ?? "en";
  }

  const locales = await getStaticData([lang]);

  return (
    <html lang={lang}>
      <body style={{ overflow: "hidden" }}>
        <TolgeeNextProvider locale={lang} locales={locales}>
          <GeistProvider>
            <RecoilRoot>
              <ThemeRegistry>
                <div id="root">
                  <ScrollHelper>
                    <AppBar />
                    <AppBarMargin />
                    <Container
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "32px 16px 32px 16px",
                        maxWidth: "1000px",
                        width: "100%",
                      }}
                    >
                      <noscript>
                        <Typography sx={{ textAlign: "center" }} variant="h3" component="h2">
                          Please enable JavaScript!
                        </Typography>
                      </noscript>
                      {children}
                    </Container>
                  </ScrollHelper>
                </div>
              </ThemeRegistry>
            </RecoilRoot>
          </GeistProvider>
        </TolgeeNextProvider>
      </body>
    </html>
  );
};

export default Layout;
