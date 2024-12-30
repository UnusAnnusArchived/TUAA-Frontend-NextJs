"use client";

import useColorScheme from "@/hooks/useColorScheme";
import { Divider } from "@mui/material";
import styles from "./description.module.scss";

interface IProps {
  description: string;
}

const Description: React.FC<IProps> = ({ description }) => {
  const [[_, colorScheme]] = useColorScheme();

  if (description === "") {
    return <></>;
  }

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
