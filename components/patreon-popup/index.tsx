import ***REMOVED*** useRef ***REMOVED*** from "react";
import dynamic from "next/dynamic";
import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import ***REMOVED*** showPatreonAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import styles from "./style.module.scss";
import NonSsrWrapper from "../non-ssr-wrapper";

const PatreonPopup: React.FC = () => ***REMOVED***
  const [, setToast] = useToasts();
  const [showPatreonToast, setPatreonToast] = useRecoilState(showPatreonAtom);
  const ref = useRef(null);

  console.log(showPatreonToast);

  return (
    <NonSsrWrapper>
      ***REMOVED***showPatreonToast ? (
        <>
          <div ref=***REMOVED***ref***REMOVED*** className=***REMOVED***styles.patreonToast***REMOVED***>
            <h2>Servers cost money!</h2>
            <p>Would you like to donate to our Patreon to support us? All money will go towards improving the site.</p>
            <div style=***REMOVED******REMOVED*** flexDirection: "row" ***REMOVED******REMOVED***>
              <a
                className="btn btn-primary"
                onClick=***REMOVED***() => ***REMOVED***
                  setPatreonToast(false);
                  window?.open?.("https://www.patreon.com/theunusannusarchive/", "_blank");
            ***REMOVED******REMOVED***
              >
                Yes
              </a>
              &nbsp;
              <a
                className="btn btn-secondary"
                onClick=***REMOVED***() => ***REMOVED***
                  setPatreonToast(false);
                  setToast(***REMOVED*** text: "Alright, we won't show you this anymore.", type: "success", delay: 5000 ***REMOVED***);
            ***REMOVED******REMOVED***
              >
                No
              </a>
              <br />
              <br />
              <a
                className="btn btn-secondary"
                onClick=***REMOVED***() => ***REMOVED***
                  ref.current.style.display = "none";
            ***REMOVED******REMOVED***
              >
                Cancel
              </a>
            </div>
          </div>
        </>
      ) : (
        <></>
      )***REMOVED***
    </NonSsrWrapper>
  );
***REMOVED***;

export default PatreonPopup;
