import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { SyntheticEvent } from "react";

interface IProps extends React.PropsWithChildren<{}> {
  header: string | React.ReactNode;
  description?: string | React.ReactNode;
  expanded: boolean;
  onChange: (event: SyntheticEvent<Element, Event>, expanded: boolean) => void;
}

const TranslateAccordion: React.FC<IProps> = ({ header, description, expanded, onChange, children }) => {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>{header}</Typography>
        {description && <Typography sx={{ color: "text.secondary" }}>{description}</Typography>}
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>{children}</div>
      </AccordionDetails>
    </Accordion>
  );
};

export default TranslateAccordion;
