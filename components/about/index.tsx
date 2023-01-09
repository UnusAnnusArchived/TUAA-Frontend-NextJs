import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import Image from "next/image";
import moment from "moment-with-locales-es6";
import React, { useEffect, useState } from "react";
import { api } from "../../src/endpoints.json";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutDialog: React.FC<IProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [build, setBuild] = useState<number>(NaN);
  const [builtOn, setBuiltOn] = useState<number>(0);
  const [branch, setBranch] = useState<string>("Loading Branch");
  const { i18n } = useTranslation();

  useEffect(() => {
    fetch(`${api}/v2/build-info`)
      .then((res) => res.json())
      .then((buildInfo) => {
        setBuild(buildInfo.build);
        setBuiltOn(buildInfo.date);
      });

    fetch(`${api}/v2/branch`)
      .then((res) => res.json())
      .then(({ branch }) => {
        setBranch(branch);
      });
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{t("pages:about")}</DialogTitle>
      <DialogContent>
        <div style={{ textAlign: "center" }}>
          <Image src="/ua.png" alt="Unus Annus Logo" width="75" height="75" style={{ borderRadius: "100%" }} />
          <Typography variant="h5">{t("pages:site")}</Typography>
          <DialogContentText>
            {t("about:build_number")
              .replace("{number}", build.toString())
              .replace("{date}", moment.utc(builtOn).locale(i18n.language).local().format("MM/DD/YYYY h:mm:ss A"))}
          </DialogContentText>
          <DialogContentText>{branch}</DialogContentText>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("common:close")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutDialog;
