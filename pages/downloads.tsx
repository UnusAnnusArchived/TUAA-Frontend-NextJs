import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import { DownloadItem } from "../components/download-item";

//Images
import tuaaDownloaderPic from "../assets/tuaa-downloader.png";
import tuaaNodeApiPic from "../assets/tuaa-node-api.png";

const Download: React.FC<void> = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <MetaHead baseTitle={t("downloads:title")} />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          {t("downloads:title")}
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />

          <DownloadItem name="The Unus Annus Downloader" description={t("downloads:tuaaDownloader:description")} image={tuaaDownloaderPic} link="http://github.com/TheUnusAnnusArchive/TUAA-Downloader/releases/latest"></DownloadItem>
          <DownloadItem name="The Unus Annus Archive Node.JS API" description={t("downloads:tuaaNodeApi:description")} image={tuaaNodeApiPic} link="http://github.com/TheUnusAnnusArchive/TUAA-Node-API"></DownloadItem>

        </div>
      </div>
    </Layout>
  );
};

export default Download;
