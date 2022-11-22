import Paper from "@mui/material/Paper";
import Plus from "@mui/icons-material/Add";
import moment from "moment";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import styles from "../styles/PatreonDonors.module.scss";
import { Divider, Typography } from "@mui/material";
import pb from "../src/pocketbase";
import { useEffect, useState } from "react";
import getPbImagePath from "../src/utils/getPbImagePath";

const PatreonDonors = () => {
  const [patreons, setPatreons] = useState([]);

  useEffect(() => {
    pb.records
      .getList("patreons", 1, 400, {
        sort: "name",
      })
      .then((fetchedPatreons) => {
        setPatreons(fetchedPatreons.items);
      });
  }, []);

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
        {patreons.map((patreon) => {
          console.log(patreon);
          return (
            <div className="col-12 col-md-4 p-2 h-100">
              <Paper className={`p-2 h-100 ${styles.patreon}`}>
                <img
                  className={styles.pfp}
                  width="100"
                  height="100"
                  src={getPbImagePath("patreons", patreon.id, patreon.pfp, 200, 200)}
                  alt={`${patreon.name}'s Patreon Profile Picture`}
                />
                <div className={styles.infoContainer}>
                  <span className={styles.name}>{patreon.name}</span>
                  <span>Since {moment.utc(patreon.since).fromNow()}</span>
                  <span>{patreon.amount}</span>
                </div>
              </Paper>
            </div>
          );
        })}
        <div className="col-12 col-md-4 p-2 h-100 pointer">
          <a
            style={{ textDecoration: "none" }}
            href="https://www.patreon.com/theunusannusarchive"
            rel="noreferrer"
            target="_blank"
          >
            <Paper className={`p-2 h-100 ${styles.patreon}`}>
              <div style={{ borderRadius: "100%", backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
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
