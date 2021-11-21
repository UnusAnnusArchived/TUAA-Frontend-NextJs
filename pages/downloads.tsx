import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import tuaaDownloaderPic from "../assets/tuaa-downloader.png";
import { DownloadItem } from "../components/download-item";

const Download: React.FC<void> = (props) => {
  const { t, i18n } = useTranslation()

  return (
    <Layout>
      <MetaHead baseTitle="Downloads" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          {t("downloads:title")}
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: '#fff' }} className="my-3" />

          <DownloadItem name="The Unus Annus Downloader" description={t("downloads:tuaaDownloader:description")} image={tuaaDownloaderPic} link="http://github.com/TheUnusAnnusArchive/TUAA-Downloader/releases/latest"></DownloadItem>

        </div>
      </div>
    </Layout>
  )
}

export default Download
