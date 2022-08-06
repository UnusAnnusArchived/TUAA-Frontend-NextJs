import Paper from "@mui/material/Paper";
import Plus from "@mui/icons-material/Add";
import Image from "next/image";
import moment from "moment";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import styles from "../styles/PatreonDonors.module.scss";

// Import Profile Pictures
import CaitieP from "../patreon-donor-pfps/Caitie P.jpeg";
import Colyn from "../patreon-donor-pfps/Colyn.jpeg";
import TheBoltLord from "../patreon-donor-pfps/TheBoltLord ..jpeg";
import Link from "next/link";
import { Divider, Typography } from "@mui/material";

const PatreonDonors = () => {
  return (
    <Layout>
      <MetaHead baseTitle="Patreon Donors" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          Patreon Donors
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={CaitieP}
              alt="Caitie P's Patreon Profile Picture"
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Caitie P</span>
              <span>Since {moment("2022-03-03").fromNow()}</span>
              <span>$5</span>
            </div>
          </Paper>
        </div>
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image className={styles.pfp} width="100" height="100" src={Colyn} alt="Colyn's Patreon Profile Picture" />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Colyn</span>
              <span>Since {moment("2022-08-01").fromNow()}</span>
              <span>$5</span>
            </div>
          </Paper>
        </div>
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={TheBoltLord}
              alt="TheBoltLord .'s Patreon Profile Picture"
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>TheBoltLord .</span>
              <span>Since {moment("2022-02-03").fromNow()}</span>
              <span>$1</span>
            </div>
          </Paper>
        </div>
        <div className="col-12 col-md-4 p-2 h-100 pointer">
          <a
            style={{ textDecoration: "none" }}
            href="https://www.patreon.com/theunusannusarchive"
            rel="noreferrer"
            target="_blank"
          >
            <Paper className={`p-2 h-100 ${styles.patreon}`}>
              <div style={{ borderRadius: "100%", backgroundColor: "#3e3e3e" }}>
                <Plus style={{ width: 100, height: 100 }} />
              </div>
              <div className={styles.infoContainer}>
                <span className={styles.name}>Want to see your name listed here?</span>
                <span>Subscribe</span>
              </div>
            </Paper>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default PatreonDonors;
