import pb from "../src/pocketbase";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { oAuthProviderAtom, userAtom } from "../src/atoms";
import { siteRoot } from "../src/endpoints.json";
import { useEffect } from "react";

const OAuth2: React.FC = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [provider, setProvider] = useRecoilState(oAuthProviderAtom);

  useEffect(() => {
    const params = router.query as { [key: string]: string };

    if (params.state && params.code) {
      if (provider.state !== params.state) {
        alert("State parameters do not match! Please try again.");
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
          alert(
            `Error logging in! This is most likely because you do not have an account with us. Please create one and link your ${provider.name} account.`
          );
          router.push("/register");
        }
      })();
    }
  }, [router, router.query]);

  return <p style={{ color: "#ffffff" }}>Redirecting...</p>;
};

export default OAuth2;
