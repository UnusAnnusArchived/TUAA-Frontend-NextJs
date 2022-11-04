import pb from "../src/pocketbase";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { oAuthProviderAtom, userAtom } from "../src/atoms";
import { siteRoot } from "../src/endpoints.json";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MetaHead } from "../components/meta-head";

const OAuth2: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [provider, setProvider] = useRecoilState(oAuthProviderAtom);

  useEffect(() => {
    const params = router.query as { [key: string]: string };

    if (params.state && params.code) {
      if (provider.state !== params.state) {
        alert(t("oauth2:state_param_error"));
        router.push("/login");
        return;
      }

      (async () => {
        try {
          const authData = await pb
            .collection("users")
            .authWithOAuth2(provider.name, params.code, provider.codeVerifier, `${siteRoot}/oauth2`);
          setLoggedInUser(authData.record);
          setProvider(null);
          router.push("/");
        } catch (err) {
          console.error(err);
          alert(t("oauth2:generic_error").replace("{provider}", provider.name));
          router.push("/register");
        }
      })();
    }
  }, [router, router.query]);

  return (
    <>
      <MetaHead baseTitle={t("pages:oauth2")} />
      <p style={{ color: "#ffffff" }}>{t("pages:oauth2")}</p>;
    </>
  );
};

export default OAuth2;
