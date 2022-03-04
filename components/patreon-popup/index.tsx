import { useToasts } from "@geist-ui/react";
import { showPatreonAtom } from "../../src/atoms";
import { useRecoilState } from "recoil";

const PatreonPopup: React.FC = () => {
  const [, setToast] = useToasts();
  const [showPatreonToast, setPatreonToast] = useRecoilState(showPatreonAtom);

  return (
    <>
      {showPatreonToast ? (
        <>
          <div
            style={{
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
            }}
          >
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
            </div>
          </div>
        </>
      ) : (
        <h1>test</h1>
      )}
    </>
  );
};

export default PatreonPopup;
