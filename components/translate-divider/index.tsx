import { Divider, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  header?: string | ReactNode;
}

const TranslateDivider: React.FC<IProps> = ({ header }) => {
  return (
    <>
      <div style={{ flexBasis: "100%", height: 0 }}>
        <Divider sx={{ width: "100%" }} />
      </div>
      {header && (
        <>
          <div style={{ flexBasis: "100%", height: 0, margin: "-12px 0" }}>
            <Typography>{header}</Typography>
          </div>
        </>
      )}
    </>
  );
};

export default TranslateDivider;
