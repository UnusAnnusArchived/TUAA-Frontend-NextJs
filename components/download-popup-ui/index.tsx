import { Paper } from "@mui/material";
import styles from "./styles.module.scss";

interface IProps {
  children: React.ReactNode;
}

const DownloadPopupUI: React.FC<IProps> = ({ children }) => {
  return (
    <div className={styles.downloadPopupContainer}>
      <Paper className={`my-3 p-3 ${styles.downloadPopup}`}>{children}</Paper>
    </div>
  );
};

export default DownloadPopupUI;
