"use client";

import { Divider } from "@mui/material";
import styles from "./description.module.scss";
import { useColorScheme } from "@/hooks/localStorageHooks";
import { useIsClient } from "@uidotdev/usehooks";

interface IProps {
  description: string;
}

const Description: React.FC<IProps> = ({ description }) => {
  const isClient = useIsClient();

  if (description === "") {
    return <></>;
  }

  if (isClient) {
    return <DescriptionClient description={description} />;
  }

  return (
    <>
      <Divider sx={{ margin: ".5rem 0" }} />
      <div
        className={styles.description}
        style={
          // @ts-ignore
          { "--color": "#ffffff", "--decoration-color": "rgba(255, 255, 255, 0.4)" }
        }
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </>
  );
};

const DescriptionClient: React.FC<IProps> = ({ description }) => {
  const [colorScheme] = useColorScheme();

  return (
    <>
      <Divider sx={{ margin: ".5rem 0" }} />
      <div
        className={styles.description}
        style={
          colorScheme === "dark"
            ? // @ts-ignore
              { "--color": "#ffffff", "--decoration-color": "rgba(255, 255, 255, 0.4)" }
            : { "--color": "#000000", "--decoration-color": "rgba(0, 0, 0, 0.4)" }
        }
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </>
  );
};

export default Description;
