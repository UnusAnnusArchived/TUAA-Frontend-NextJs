import React from "react";
import Image from "next/image";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface IProps ***REMOVED***
  name: string;
  description: string;
  image: StaticImageData;
  link: string;
  newTab: boolean;
***REMOVED***

const DownloadItem: React.FC<IProps> = (***REMOVED*** name, description, image, link, newTab ***REMOVED***) => ***REMOVED***
  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  return (
    <div className="col-12 col-md-4 p-2">
      <a href=***REMOVED***link***REMOVED*** target=***REMOVED***newTab ? "_blank" : ""***REMOVED*** rel="noreferrer" style=***REMOVED******REMOVED*** textDecoration: "none" ***REMOVED******REMOVED***>
        <div className="pointer h-100">
          <Paper className="p-2 h-100">
            <Image
              src=***REMOVED***image.src***REMOVED***
              alt=***REMOVED***t("downloads:imageAlt").replace("***REMOVED***downloadName", name)***REMOVED***
              width=***REMOVED***image.width***REMOVED***
              height=***REMOVED***image.height***REMOVED***
            />
            <div className="text-center mt-2">
              <Typography variant="body1">***REMOVED***name***REMOVED***</Typography>
            </div>
            <div className="text-center mt-2">
              <Typography variant="body2">***REMOVED***description***REMOVED***</Typography>
            </div>
          </Paper>
        </div>
      </a>
    </div>
  );
***REMOVED***;

export default DownloadItem;
