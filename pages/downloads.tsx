import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import React from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import tuaaDownloaderPic from "../assets/tuaa-downloader.png";
import ***REMOVED*** DownloadItem ***REMOVED*** from "../components/download-item";

const Download: React.FC<void> = (props) => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation()

  return (
    <Layout>
      <MetaHead baseTitle="Downloads" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          ***REMOVED***t("downloads:title")***REMOVED***
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx=***REMOVED******REMOVED*** width: "50%", backgroundColor: '#fff' ***REMOVED******REMOVED*** className="my-3" />

          <DownloadItem name="The Unus Annus Downloader" description=***REMOVED***t("downloads:tuaaDownloader:description")***REMOVED*** image=***REMOVED***tuaaDownloaderPic***REMOVED*** link="http://github.com/TheUnusAnnusArchive/TUAA-Downloader/releases/latest"></DownloadItem>

        </div>
      </div>
    </Layout>
  )
***REMOVED***

export default Download
