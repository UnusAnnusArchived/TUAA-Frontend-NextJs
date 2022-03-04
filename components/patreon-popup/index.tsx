import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import ***REMOVED*** showPatreonAtom ***REMOVED*** from "../../src/atoms";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";

const PatreonPopup: React.FC = () => ***REMOVED***
  const [, setToast] = useToasts();
  const [showPatreonToast, setPatreonToast] = useRecoilState(showPatreonAtom);

  return (
    <>
      ***REMOVED***showPatreonToast ? (
        <>
          <div
            style=***REMOVED******REMOVED***
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#1c1c1e",
              textAlign: "center",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "25px",
              height: "200px",
              transition: "height 1s ease",
        ***REMOVED******REMOVED***
          >
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
            </div>
          </div>
        </>
      ) : (
        <h1>test</h1>
      )***REMOVED***
    </>
  );
***REMOVED***;

export default PatreonPopup;
