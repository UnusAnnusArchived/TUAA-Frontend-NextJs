import Typography from "@mui/material/Typography";
import React from "react";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const Page: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <MetaHead title="Not Found | The Unus Annus Archive" />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Typography variant="h5" className="text-white my-5">
          {t("errors:pageNotFound")}
        </Typography>
        <Link passHref href="/">
          <Button variant="contained" color="primary">
            {t("errors:returnToHome")}
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Page;
