import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** Layout ***REMOVED*** from "../../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../../components/meta-head";
import ***REMOVED*** DownloadItem ***REMOVED*** from "../../components/download-item";

//Images
import tuaaDownloaderPic from "../../assets/tuaa-downloader.png";
import tuaaNodeApiPic from "../../assets/tuaa-node-api.png";

const Download: React.FC<void> = (props) => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  return (
    <Layout>
      <MetaHead baseTitle=***REMOVED***t("downloads:title")***REMOVED*** />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          ***REMOVED***t("downloads:title")***REMOVED***
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx=***REMOVED******REMOVED*** width: "50%", backgroundColor: "#fff" ***REMOVED******REMOVED*** className="my-3" />

          ***REMOVED***/* <DownloadItem
            name="Download Specific Episode"
            description=***REMOVED***t("downloads:specificEpisode:description")***REMOVED***
            image=***REMOVED******REMOVED*** src: "https://cdn.unusann.us/thumbnails/01/001.jpg", width: 1280, height: 720 ***REMOVED******REMOVED***
            link="/downloads/specific-episode/"
            newTab=***REMOVED***false***REMOVED***
          /> */***REMOVED***
          <DownloadItem
            name="The Unus Annus Downloader"
            description=***REMOVED***t("downloads:tuaaDownloader:description")***REMOVED***
            image=***REMOVED***tuaaDownloaderPic***REMOVED***
            link="http://github.com/TheUnusAnnusArchive/TUAA-Downloader/releases/latest"
            newTab=***REMOVED***true***REMOVED***
          ></DownloadItem>
          <DownloadItem
            name="The Unus Annus Archive Node.JS API"
            description=***REMOVED***t("downloads:tuaaNodeApi:description")***REMOVED***
            image=***REMOVED***tuaaNodeApiPic***REMOVED***
            link="http://github.com/TheUnusAnnusArchive/TUAA-Node-API"
            newTab=***REMOVED***true***REMOVED***
          ></DownloadItem>
        </div>
      </div>
    </Layout>
  );
***REMOVED***;

export default Download;
