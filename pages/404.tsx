import Typography from "@mui/material/Typography";
import React from "react";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import Link from "next/link";
import Button from "@mui/material/Button";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";

const Page: React.FC = () => ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  return (
    <Layout>
      <MetaHead title="Not Found | The Unus Annus Archive" />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Typography variant="h5" className="text-white my-5">
          ***REMOVED***t("errors:pageNotFound")***REMOVED***
        </Typography>
        <Link passHref href="/">
          <Button variant="contained" color="primary">
            ***REMOVED***t("errors:returnToHome")***REMOVED***
          </Button>
        </Link>
      </div>
    </Layout>
  );
***REMOVED***;

export default Page;
