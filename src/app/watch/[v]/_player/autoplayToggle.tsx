import { Tooltip } from "@mui/material";
import { CSSProperties, useState } from "react";

const disabledStyles: CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
};

const AutoplayToggle: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    // setChecked((checked) => !checked);
  };

  return (
    <div className="vds-menu-item">
      <div className="vds-menu-item-label">Autoplay</div>
      <Tooltip title="Not Implemented" arrow>
        <div className="vds-menu-checkbox" aria-checked={checked} onClick={handleClick} style={disabledStyles} />
      </Tooltip>
    </div>
  );
};

export default AutoplayToggle;
