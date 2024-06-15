import { Tooltip } from "@mui/material";
import { T } from "@tolgee/react";
import { CSSProperties, useState } from "react";

const disabledStyles: CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
};

interface IProps {
  disabled?: boolean;
}

const AutoplayToggle: React.FC<IProps> = ({ disabled }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked((checked) => !checked);
  };

  return (
    <div className="vds-menu-item">
      <div className="vds-menu-item-label">
        <T keyName="vidstack.custom.autoplay" />
      </div>
      {disabled ? (
        <Tooltip title={<T keyName="notImplemented" />} arrow>
          <div className="vds-menu-checkbox" aria-checked={checked} style={disabledStyles} />
        </Tooltip>
      ) : (
        <div className="vds-menu-checkbox" aria-checked={checked} onClick={handleClick} />
      )}
    </div>
  );
};

export default AutoplayToggle;
