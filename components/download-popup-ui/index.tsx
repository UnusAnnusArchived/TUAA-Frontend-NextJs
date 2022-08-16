import { Paper } from "@mui/material";
import styles from "./styles.module.scss";

const DownloadPopupUI: React.FC = ({ children }) => {
  return (
    <div className={styles.downloadPopupContainer}>
      <Paper className={`my-3 p-3 ${styles.downloadPopup}`}>{children}</Paper>
    </div>
  );
};

export default DownloadPopupUI;
