import { Paper } from "@mui/material";

const TranslateFakeDialog: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Paper
      sx={{
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
        backgroundColor: "#121212",
        width: 600,
        // maxWidth: 600,
      }}
    >
      {children}
    </Paper>
  );
};

export default TranslateFakeDialog;
