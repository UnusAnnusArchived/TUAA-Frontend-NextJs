import { useRecoilState } from "recoil";
import { colorSchemeAtom } from "../../src/atoms";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, colors } from "@mui/material";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AprilFoolsDialog: React.FC<IProps> = ({ open, setOpen }) => {
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSwitch = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Oops!</DialogTitle>
      <DialogContent>
        <Typography>
          Oops it looks like you broke the color scheme selector! Don't worry, we'll have our advanced AI detect the
          correct one.
        </Typography>
        <Typography>
          WE HAVE DETECTED <code>{colorScheme}</code> AS THE PROPER COLOR SCHEME.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSwitch}>
          I&nbsp;<strong>Need</strong>&nbsp;{colorScheme === "dark" ? "light" : "dark"} Mode
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AprilFoolsDialog;
