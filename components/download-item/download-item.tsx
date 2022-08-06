import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface IProps {
  name: string;
  description: string;
  image: StaticImageData;
  link: string;
  newTab: boolean;
}

const DownloadItem: React.FC<IProps> = ({ name, description, image, link, newTab }) => {
  const { t, i18n } = useTranslation();

  console.log(image);

  return (
    <div className="col-12 col-md-4 p-2">
      <a href={link} target={newTab ? "_blank" : ""} rel="noreferrer" style={{ textDecoration: "none" }}>
        <div className="pointer h-100">
          <Paper className="p-2 h-100">
            <Image
              src={image.src}
              alt={t("downloads:imageAlt").replace("{downloadName", name)}
              width={image.width}
              height={image.height}
            />
            <div className="text-center mt-2">
              <Typography variant="body1">{name}</Typography>
            </div>
            <div className="text-center mt-2">
              <Typography variant="body2">{description}</Typography>
            </div>
          </Paper>
        </div>
      </a>
    </div>
  );
};

export default DownloadItem;
