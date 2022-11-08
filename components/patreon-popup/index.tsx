import { useRef } from "react";
import { useToasts } from "@geist-ui/react";
import { showPatreonAtom } from "../../src/atoms";
import { useRecoilState } from "recoil";
import styles from "./style.module.scss";
import NonSsrWrapper from "../non-ssr-wrapper";

const PatreonPopup: React.FC = () => {
  const [, setToast] = useToasts();
  const [showPatreonToast, setPatreonToast] = useRecoilState(showPatreonAtom);
  const ref = useRef(null);

  return (
    <NonSsrWrapper>
      {showPatreonToast ? (
        <>
          <div ref={ref} className={styles.patreonToast}>
            <h2>Servers cost money!</h2>
            <p>Would you like to donate to our Patreon to support us? All money will go towards improving the site.</p>
            <div style={{ flexDirection: "row" }}>
              <a
                className="btn btn-primary"
                onClick={() => {
                  setPatreonToast(false);
                  window?.open?.("https://www.patreon.com/theunusannusarchive/", "_blank");
                }}
              >
                Yes
              </a>
              &nbsp;
              <a
                className="btn btn-secondary"
                onClick={() => {
                  setPatreonToast(false);
                  setToast({ text: "Alright, we won't show you this anymore.", type: "success", delay: 5000 });
                }}
              >
                No
              </a>
              <br />
              <br />
              <a
                className="btn btn-secondary"
                onClick={() => {
                  ref.current.style.display = "none";
                }}
              >
                Cancel
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
