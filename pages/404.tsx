import Typography from "@mui/material/Typography";
import React from "react";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";

const Page: React.FC = () => ***REMOVED***
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
***REMOVED***;

export default Page;
