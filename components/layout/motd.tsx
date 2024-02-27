import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import pb from "../../src/pocketbase";
import { Collection } from "../../src/types";

const Motd: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      const { data: title } = await pb.collection(Collection.Meta).getFirstListItem('key="motd_title"');
      setTitle(title);
      const { data: description } = await pb.collection(Collection.Meta).getFirstListItem('key="motd_desc"');
      setDescription(description);
    })();
  }, []);

  if (title || description) {
    return (
      <Paper sx={{ padding: "1rem", margin: "0 0 1rem 0" }}>
        {title && (
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
        )}
        {description && <Typography>{description}</Typography>}
      </Paper>
    );
  }

  return <></>;
};

export default Motd;
