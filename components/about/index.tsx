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
import moment from "moment";
import React, { useEffect, useState } from "react";
import { endpoint } from "../../src/endpoints";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutDialog: React.FC<IProps> = ({ open, setOpen }) => {
  const [build, setBuild] = useState<number>(NaN);
  const [builtOn, setBuiltOn] = useState<number>(0);

  useEffect(() => {
    fetch(`${endpoint}/v2/build-info`)
      .then((res) => res.json())
      .then((buildInfo) => {
        setBuild(buildInfo.build);
        setBuiltOn(buildInfo.date);
      });
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>About</DialogTitle>
      <DialogContent>
        <div style={{ textAlign: "center" }}>
          <Image src="/ua.png" width="75" height="75" style={{ borderRadius: "100%" }} />
          <Typography variant="h5">The Unus Annus Archive</Typography>
          <DialogContentText>
            Build {build} ({moment.utc(builtOn).format("MM/DD/YYYY HH:MM:SS")})
          </DialogContentText>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutDialog;
