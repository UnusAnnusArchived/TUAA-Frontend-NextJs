import Paper from "@mui/material/Paper";
import Plus from "@mui/icons-material/Add";
import Image from "next/image";
import moment from "moment";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import styles from "../styles/PatreonDonors.module.scss";
import Link from "next/link";
import ***REMOVED*** Divider, Typography ***REMOVED*** from "@mui/material";

// Import Profile Pictures
import CaitieP from "../patreon-donor-pfps/Caitie P.webp";
import CHGJake from "../patreon-donor-pfps/CHG Jake.webp";
import Colyn from "../patreon-donor-pfps/Colyn.webp";
import HopeVictoriaLiepe from "../patreon-donor-pfps/Hope Victoria Liepe.webp";
import ItsMe from "../patreon-donor-pfps/It's Me.webp";
import JoshuaPerez from "../patreon-donor-pfps/Joshua Perez.webp";
import Katsam87 from "../patreon-donor-pfps/Katsam87.webp";
import rae from "../patreon-donor-pfps/rae.webp";
import TheBoltLord from "../patreon-donor-pfps/TheBoltLord ..webp";

const PatreonDonors = () => ***REMOVED***
  return (
    <Layout>
      <MetaHead baseTitle="Patreon Donors" />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          Patreon Donors
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx=***REMOVED******REMOVED*** width: "50%", backgroundColor: "#fff" ***REMOVED******REMOVED*** className="my-3" />
        </div>
      </div>
      <div className="row">
        ***REMOVED***/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***CaitieP.src***REMOVED***
              alt="Caitie P's Patreon Profile Picture"
              blurDataURL=***REMOVED***CaitieP.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>Caitie P</span>
              <span>Since ***REMOVED***moment("2022-03-03").fromNow()***REMOVED***</span>
              <span>€4.50</span>
            </div>
          </Paper>
        </div> */***REMOVED***
        ***REMOVED***/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***CHGJake.src***REMOVED***
              alt="CHG Jake's Patreon Profile Picture"
              blurDataURL=***REMOVED***CHGJake.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>CHG Jake</span>
              <span>Since ***REMOVED***moment("2022-09-01").fromNow()***REMOVED***</span>
              <span>$5</span>
            </div>
          </Paper>
        </div> */***REMOVED***
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***Colyn.src***REMOVED***
              alt="Colyn's Patreon Profile Picture"
              blurDataURL=***REMOVED***Colyn.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>Colyn</span>
              <span>Since ***REMOVED***moment("2022-08-01").fromNow()***REMOVED***</span>
              <span>$5</span>
            </div>
          </Paper>
        </div>
        ***REMOVED***/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***HopeVictoriaLiepe.src***REMOVED***
              alt="Hope Victoria Liepe's Patreon Profile Picture"
              blurDataURL=***REMOVED***HopeVictoriaLiepe.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>Hope Victoria Liepe</span>
              <span>Since ***REMOVED***moment("2022-08-13").fromNow()***REMOVED***</span>
              <span>$5</span>
            </div>
          </Paper>
        </div> */***REMOVED***
        ***REMOVED***/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***ItsMe.src***REMOVED***
              alt="It's Me's Patreon Profile Picture"
              blurDataURL=***REMOVED***ItsMe.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>It&apos;s Me</span>
              <span>Since ***REMOVED***moment("2022-08-25").fromNow()***REMOVED***</span>
              <span>$1</span>
            </div>
          </Paper>
        </div> */***REMOVED***
        ***REMOVED***/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***JoshuaPerez.src***REMOVED***
              alt="Joshua Perez's Patreon Profile Picture"
              blurDataURL=***REMOVED***JoshuaPerez.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>Joshua Perez</span>
              <span>Since ***REMOVED***moment("2022-08-30").fromNow()***REMOVED***</span>
              <span>$1</span>
            </div>
          </Paper>
        </div> */***REMOVED***
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***Katsam87.src***REMOVED***
              alt="Katsam87's Patreon Profile Picture"
              blurDataURL=***REMOVED***Katsam87.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>Katsam87</span>
              <span>Since ***REMOVED***moment("2022-08-20").fromNow()***REMOVED***</span>
              <span>$1</span>
            </div>
          </Paper>
        </div>
        ***REMOVED***/* <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***rae.src***REMOVED***
              alt="rae's Patreon Profile Picture"
              blurDataURL=***REMOVED***rae.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>rae</span>
              <span>Since ***REMOVED***moment("2022-08-14").fromNow()***REMOVED***</span>
              <span>$2</span>
            </div>
          </Paper>
        </div> */***REMOVED***
        <div className="col-12 col-md-4 p-2 h-100">
          <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
            <Image
              className=***REMOVED***styles.pfp***REMOVED***
              width="100"
              height="100"
              src=***REMOVED***TheBoltLord.src***REMOVED***
              alt="TheBoltLord .'s Patreon Profile Picture"
              blurDataURL=***REMOVED***TheBoltLord.blurDataURL***REMOVED***
            />
            <div className=***REMOVED***styles.infoContainer***REMOVED***>
              <span className=***REMOVED***styles.name***REMOVED***>TheBoltLord .</span>
              <span>Since ***REMOVED***moment("2022-02-03").fromNow()***REMOVED***</span>
              <span>$1</span>
            </div>
          </Paper>
        </div>
        <div className="col-12 col-md-4 p-2 h-100 pointer">
          <a
            style=***REMOVED******REMOVED*** textDecoration: "none" ***REMOVED******REMOVED***
            href="https://www.patreon.com/theunusannusarchive"
            rel="noreferrer"
            target="_blank"
          >
            <Paper className=***REMOVED***`p-2 h-100 $***REMOVED***styles.patreon***REMOVED***`***REMOVED***>
              <div style=***REMOVED******REMOVED*** borderRadius: "100%", backgroundColor: "#3e3e3e" ***REMOVED******REMOVED***>
                <Plus style=***REMOVED******REMOVED*** width: 100, height: 100 ***REMOVED******REMOVED*** />
              </div>
              <div className=***REMOVED***styles.infoContainer***REMOVED***>
                <span className=***REMOVED***styles.name***REMOVED***>Want to see your name listed here?</span>
                <span>Subscribe</span>
              </div>
            </Paper>
          </a>
        </div>
      </div>
    </Layout>
  );
***REMOVED***;

export default PatreonDonors;
