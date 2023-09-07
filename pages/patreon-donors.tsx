import Paper from "@mui/material/Paper";
import Plus from "@mui/icons-material/Add";
import moment from "moment-with-locales-es6";
import { Layout } from "../components/layout";
import { MetaHead } from "../components/meta-head";
import styles from "../styles/PatreonDonors.module.scss";
import { Divider, Typography } from "@mui/material";
import pb from "../src/pocketbase";
import { useEffect, useState } from "react";
import getPbImagePath from "../src/utils/getPbImagePath";
import { useTranslation } from "react-i18next";
import { Collection } from "../src/types";

const PatreonDonors = () => {
  const { t, i18n } = useTranslation();
  const [patreons, setPatreons] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedPatreons = (await pb.collection(Collection.Patreons).getList(1, 400, { sort: "name" })).items;
      setPatreons(fetchedPatreons);
    })();
  }, []);

  return (
    <Layout>
      <MetaHead baseTitle={t("pages:patreon_donors")} />
      <div className="text-center">
        <Typography variant="h5" component="h1">
          {t("pages:patreon_donors")}
        </Typography>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Divider sx={{ width: "50%", backgroundColor: "#fff" }} className="my-3" />
        </div>
      </div>
      <div className="row">
        {patreons.map((patreon) => {
          return (
            <div className="col-12 col-md-4 p-2 h-100">
              <Paper className={`p-2 h-100 ${styles.patreon}`}>
                <img
                  className={styles.pfp}
                  width="100"
                  height="100"
                  src={getPbImagePath("patreons", patreon.id, patreon.pfp, 200, 200)}
                  alt={t("patreon_donors:pfp_alt").replace("{name}", patreon.name)}
                />
                <div className={styles.infoContainer}>
                  <span className={styles.name}>{patreon.name}</span>
                  <span>
                    {t("patreon_donors:since").replace(
                      "{time}",
                      moment.utc(patreon.since).locale(i18n.language).fromNow()
                    )}
                  </span>
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
                <span className={styles.name}>{t("patreon_donors:info:description")}</span>
                <span>{t("patreon_donors:info:action")}</span>
              </div>
            </Paper>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default PatreonDonors;
