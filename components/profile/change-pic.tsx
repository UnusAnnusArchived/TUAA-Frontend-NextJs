import React, ***REMOVED*** useState ***REMOVED*** from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** userAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** styled ***REMOVED*** from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** ChangePFPResponse, CheckLoginKeyResponse ***REMOVED*** from "../../src/types";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";

const Input = styled("input")(***REMOVED***
  display: "none",
***REMOVED***);

const ChangePic: React.FC = () => ***REMOVED***
  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [image, setImage] = useState<File>(null);
  const [imageUrl, setImageUrl] = useState<string>(null);
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [, setToast] = useToasts();

  const ***REMOVED*** user ***REMOVED*** = loggedInUser;

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => ***REMOVED***
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = (e: any) => ***REMOVED***
      const src = e.target.result;
      setImageUrl(src);
***REMOVED***;
    if (file) ***REMOVED***
      try ***REMOVED***
        reader.readAsDataURL(file);
  ***REMOVED*** catch (err) ***REMOVED******REMOVED***
***REMOVED***
***REMOVED***;

  const uploadProgressHandler = (progressEvent: any) => ***REMOVED***
    const final: number = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(final);
***REMOVED***;

  const handleClickOpen = () => ***REMOVED***
    setOpen(true);
***REMOVED***;

  const handleClose = () => ***REMOVED***
    setOpen(false);
    setImage(null);
    setImageUrl(null);
    setProgress(0);
    setIsSendingImage(false);
***REMOVED***;

  const handleSubmit = async () => ***REMOVED***
    setIsSendingImage(true);
    try ***REMOVED***
      const formData = new FormData();
      formData.append("pfp", image);
      formData.append("loginKey", loggedInUser.loginKey);

      const imageUploadResult = await axios.post<ChangePFPResponse>(
        `$***REMOVED***endpoint***REMOVED***/api/v2/account/changepfp`,
        formData,
        ***REMOVED***
          onUploadProgress: (progressEvent) =>
            uploadProgressHandler(progressEvent),
    ***REMOVED***
      );

      if (imageUploadResult.status === 200) ***REMOVED***
        if (imageUploadResult.data.status === "success") ***REMOVED***
          const success = await refetchUser();
          if (success) ***REMOVED***
            setToast(***REMOVED***
              type: "success",
              text: "Profile picture changed!",
        ***REMOVED***);
            handleClose();
            return;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED*** catch (error) ***REMOVED***
      console.log(error);
***REMOVED***
    setIsSendingImage(false);
    setToast(***REMOVED***
      type: "error",
      text: "There has been an error changing your profile picture.",
***REMOVED***);
***REMOVED***;

  const refetchUser = async (): Promise<boolean> => ***REMOVED***
    const res = await axios.post<CheckLoginKeyResponse>(
      `$***REMOVED***endpoint***REMOVED***/api/v2/account/checkloginkey`,
      ***REMOVED*** loginKey: loggedInUser.loginKey ***REMOVED***
    );

    if (res.status === 200) ***REMOVED***
      if (res.data.isValid) ***REMOVED***
        setLoggedInUser(***REMOVED*** ...loggedInUser, ...res.data ***REMOVED***);
        return true;
  ***REMOVED***
***REMOVED***

    return false;
***REMOVED***;

  const onCancel = () => ***REMOVED***
    handleClose();
***REMOVED***;

  return (
    <div>
      <Button variant="text" onClick=***REMOVED***handleClickOpen***REMOVED***>
        Change profile picture
      </Button>
      <Dialog open=***REMOVED***open***REMOVED*** onClose=***REMOVED***handleClose***REMOVED*** maxWidth="sm" fullWidth>
        <DialogTitle className="text-center">
          Change profile picture
        </DialogTitle>

        <DialogContent>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <DialogContentText>Upload a new profile picture.</DialogContentText>
            <DialogContentText>
              Currently selected file: ***REMOVED***image ? image.name : "none"***REMOVED***
            </DialogContentText>

            ***REMOVED***imageUrl && (
              <div className="mt-2">
                <Avatar src=***REMOVED***imageUrl***REMOVED*** sx=***REMOVED******REMOVED*** width: 200, height: 200 ***REMOVED******REMOVED*** />
              </div>
            )***REMOVED***
            <div className="mt-3">
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  onChange=***REMOVED***onFileChange***REMOVED***
                  type="file"
                />
                <Button variant="contained" component="span">
                  Choose image file
                </Button>
              </label>
            </div>
            <Fade in=***REMOVED***isSendingImage***REMOVED***>
              <div className="w-100 mt-3">
                <LinearProgress value=***REMOVED***progress***REMOVED*** variant="determinate" />
              </div>
            </Fade>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick=***REMOVED***onCancel***REMOVED***>Cancel</Button>
          <Button
            onClick=***REMOVED***handleSubmit***REMOVED***
            disabled=***REMOVED***image == null || isSendingImage***REMOVED***
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
***REMOVED***;

export default ChangePic;
