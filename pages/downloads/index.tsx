import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";
import { MetaHead } from "../../components/meta-head";
import { DownloadItem } from "../../components/download-item";
import { cdn } from "../../src/endpoints.json";

//Images
import tuaaDownloaderPic from "../../assets/tuaa-downloader.png";
import tuaaNodeApiPic from "../../assets/tuaa-node-api.png";

const Download: React.FC<void> = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <MetaHead baseTitle={t("pages:downloads")} />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          {t("pages:downloads")}
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />

          <DownloadItem
            name={t("downloads:specific_episode_link:name")}
            description={t("downloads:specific_episode_link:description")}
            image={{ src: `${cdn}/thumbnails/01/001.webp`, width: 1280, height: 720 }}
            link="/downloads/specific-episode/"
            newTab={false}
          />
          <DownloadItem
            name="The Unus Annus Downloader (Beta)"
            description="An easy way to mass download any of our episodes. This app is in beta so expect things to not work properly. Currently Windows only."
            image={tuaaDownloaderPic}
            link="https://app-dl.unusann.us/tuaa-downloader/2.0.0-pre-1/TUAA-Downloader-2.0.0-pre-1-win.exe"
            newTab={true}
          ></DownloadItem>
          <DownloadItem
            name={t("downloads:tuaa_node_api_link:name")}
            description={t("downloads:tuaa_node_api_link:description")}
            image={tuaaNodeApiPic}
            link="http://github.com/TheUnusAnnusArchive/TUAA-Node-API"
            newTab={true}
          ></DownloadItem>
        </div>
      </div>
    </Layout>
  );
};

export default Download;
