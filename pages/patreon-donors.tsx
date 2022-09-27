import Paper from "@mui/material/Paper";
import Plus from "@mui/icons-material/Add";
import Image from "next/image";
 from "moment";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import styles from "../styles/PatreonDonors.module.scss";
import Link from "next/link";
import { Divider, Typography } from "@mui/material";

// Import Profile Pictures
import Alybeanz from "../patreon-donor-pfps/Alybeanz.webp";
import CaitieP from "../patreon-donor-pfps/Caitie P.webp";
import CHGJake from "../patreon-donor-pfps/CHG Jake.webp";
import Colyn from "../patreon-donor-pfps/Colyn.webp";
import HopeVictoriaLiepe from "../patreon-donor-pfps/Hope Victoria Liepe.webp";
import ItsMe from "../patreon-donor-pfps/It's Me.webp";
import JoshuaPerez from "../patreon-donor-pfps/Joshua Perez.webp";
import Katsam87 from "../patreon-donor-pfps/Katsam87.webp";
import Nagapup from "../patreon-donor-pfps/Nagapup.webp";
import rae from "../patreon-donor-pfps/rae.webp";
import RichardTaggart from "../patreon-donor-pfps/Richard Taggart.webp";
import TheBoltLord from "../patreon-donor-pfps/TheBoltLord ..webp";

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
              src={Alybeanz.src}
              alt="Alybeanz's Patreon Profile Picture"
              blurDataURL={Alybeanz.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Alybeanz</span>
              <span>Since {moment("2022-09-23").fromNow()}</span>
              <span>$1</span>
            </div>
          </Paper>
        </div>
        {/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={CaitieP.src}
              alt="Caitie P's Patreon Profile Picture"
              blurDataURL={CaitieP.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Caitie P</span>
              <span>Since {moment("2022-03-03").fromNow()}</span>
              <span>€4.50</span>
            </div>
          </Paper>
        </div> */}
        {/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={CHGJake.src}
              alt="CHG Jake's Patreon Profile Picture"
              blurDataURL={CHGJake.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>CHG Jake</span>
              <span>Since {moment("2022-09-01").fromNow()}</span>
              <span>$5</span>
            </div>
          </Paper>
        </div> */}
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={Colyn.src}
              alt="Colyn's Patreon Profile Picture"
              blurDataURL={Colyn.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Colyn</span>
              <span>Since {moment("2022-08-01").fromNow()}</span>
              <span>$5</span>
            </div>
          </Paper>
        </div>
        {/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={HopeVictoriaLiepe.src}
              alt="Hope Victoria Liepe's Patreon Profile Picture"
              blurDataURL={HopeVictoriaLiepe.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Hope Victoria Liepe</span>
              <span>Since {moment("2022-08-13").fromNow()}</span>
              <span>$5</span>
            </div>
          </Paper>
        </div> */}
        {/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={ItsMe.src}
              alt="It's Me's Patreon Profile Picture"
              blurDataURL={ItsMe.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>It&apos;s Me</span>
              <span>Since {moment("2022-08-25").fromNow()}</span>
              <span>$1</span>
            </div>
          </Paper>
        </div> */}
        {/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={JoshuaPerez.src}
              alt="Joshua Perez's Patreon Profile Picture"
              blurDataURL={JoshuaPerez.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Joshua Perez</span>
              <span>Since {moment("2022-08-30").fromNow()}</span>
              <span>$1</span>
            </div>
          </Paper>
        </div> */}
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={Katsam87.src}
              alt="Katsam87's Patreon Profile Picture"
              blurDataURL={Katsam87.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Katsam87</span>
              <span>Since {moment("2022-08-20").fromNow()}</span>
              <span>$1</span>
            </div>
          </Paper>
        </div>
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={Nagapup.src}
              alt="Nagapup's Patreon Profile Picture"
              blurDataURL={Nagapup.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Nagapup</span>
              <span>Since {moment("2022-09-03").fromNow()}</span>
              <span>£1</span>
            </div>
          </Paper>
        </div>
        {/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={rae.src}
              alt="rae's Patreon Profile Picture"
              blurDataURL={rae.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>rae</span>
              <span>Since {moment("2022-08-14").fromNow()}</span>
              <span>$2</span>
            </div>
          </Paper>
        </div> */}
        {/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={RichardTaggart.src}
              alt="Richard Taggart's Patreon Profile Picture"
              blurDataURL={RichardTaggart.blurDataURL}
            />
            <div className={styles.infoContainer}>
              <span className={styles.name}>Richard Taggart</span>
              <span>Since {moment("2022-09-04").fromNow()}</span>
              <span>$1</span>
            </div>
          </Paper>
        </div> */}
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className={`p-2 h-100 ${styles.patreon}`}>
            <Image
              className={styles.pfp}
              width="100"
              height="100"
              src={TheBoltLord.src}
              alt="TheBoltLord .'s Patreon Profile Picture"
              blurDataURL={TheBoltLord.blurDataURL}
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
