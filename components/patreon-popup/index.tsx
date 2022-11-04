import { useRef } from "react";
import { useToasts } from "@geist-ui/react";
import { showPatreonAtom } from "../../src/atoms";
import { useRecoilState } from "recoil";
import styles from "./style.module.scss";
import NonSsrWrapper from "../non-ssr-wrapper";
import { useTranslation } from "react-i18next";

const PatreonPopup: React.FC = () => {
  const { t } = useTranslation();
  const [, setToast] = useToasts();
  const [showPatreonToast, setPatreonToast] = useRecoilState(showPatreonAtom);
  const ref = useRef(null);

  return (
    <NonSsrWrapper>
      {showPatreonToast ? (
        <>
          <div ref={ref} className={styles.patreonToast}>
            <h2>{t("patreon_popup:header")}</h2>
            <p>{t("patreon_popup:description")}</p>
            <div style={{ flexDirection: "row" }}>
              <a
                className="btn btn-primary"
                onClick={() => {
                  setPatreonToast(false);
                  window?.open?.("https://www.patreon.com/theunusannusarchive/", "_blank");
                }}
              >
                {t("patreon_popup:positive_action")}
              </a>
              &nbsp;
              <a
                className="btn btn-secondary"
                onClick={() => {
                  setPatreonToast(false);
                  setToast({ text: t("patreon_popup:negative_action_toast"), type: "success", delay: 5000 });
                }}
              >
                {t("patreon_popup:negative_action")}
              </a>
              <br />
              <br />
              <a
                className="btn btn-secondary"
                onClick={() => {
                  ref.current.style.display = "none";
                }}
              >
                {t("common:cancel")}
              </a>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </NonSsrWrapper>
  );
};

export default PatreonPopup;
