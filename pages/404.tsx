import Typography from "@mui/material/Typography";
import React from "react";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";

const Page: React.FC = () => {
  return (
    <Layout>
      <MetaHead title="Not Found | The Unus Anus Archive" />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Typography variant="h5" className="text-white my-5">
          The page you are looking for does not exist
        </Typography>
        <Link passHref href="/">
          <Button variant="contained" color="primary">
            Return to home page
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Page;
