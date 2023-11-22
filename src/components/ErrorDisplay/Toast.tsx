"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import ErrorDisplay from "./Display";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { IError } from "@/types";

interface IProps {
  title?: string;
  errors: Array<IError<string | z.typeToFlattenedError<z.infer<any>>>>;
}

const ErrorToast: React.FC<IProps> = ({ title, errors }) => {
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      setErrorDialogOpen(true);
    }
  }, [errors]);

  return <ErrorDialog title={title} open={errorDialogOpen} setOpen={setErrorDialogOpen} errors={errors} />;
};

interface DialogProps {
  title?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errors: Array<IError<string | z.typeToFlattenedError<z.infer<any>>>>;
}

const ErrorDialog: React.FC<DialogProps> = ({ title, open, setOpen, errors }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{title ?? "Error"}</DialogTitle>
      <DialogContent>
        <ErrorDisplay errors={errors} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorToast;
