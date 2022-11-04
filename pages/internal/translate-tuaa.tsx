import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";

type AccordionNames =
  | ""
  | "language"
  | "home"
  | "player"
  | "comments"
  | "seasons"
  | "common"
  | "login"
  | "register"
  | "profile"
  | "downloads"
  | "settings"
  | "errors"
  | "plyr";

const TranslateWebsite: React.FC = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<AccordionNames>("");

  const handleChange = (name: AccordionNames) => (evt: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? name : "");
  };

  return (
    <Layout>
      <Typography variant="h6" component="h2">
        {t("pages:translate_tuaa")}
      </Typography>
      <Accordion expanded={expanded === "language"} onChange={handleChange("language")}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Language Information</Typography>
          <Typography sx={{ color: "text.secondary" }}>General information about the language</Typography>
        </AccordionSummary>
        <AccordionDetails>Language Information</AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "home"} onChange={handleChange("home")}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Home Page</Typography>
        </AccordionSummary>
        <AccordionDetails>Home Page</AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "player"} onChange={handleChange("player")}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Episode Controls</Typography>
        </AccordionSummary>
        <AccordionDetails>Episode Controls</AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "comments"} onChange={handleChange("comments")}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>Episode Controls</AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "seasons"} onChange={handleChange("seasons")}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Season Names</Typography>
        </AccordionSummary>
        <AccordionDetails>Season Names</AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "common"} onChange={handleChange("common")}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>General Translations</Typography>
        </AccordionSummary>
        <AccordionDetails>General Translations</AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "seasons"} onChange={handleChange("seasons")}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Season Names</Typography>
        </AccordionSummary>
        <AccordionDetails>Seaon Names</AccordionDetails>
      </Accordion>
    </Layout>
  );
};

export default TranslateWebsite;
