import { TextField } from "@mui/material";
import React from "react";

interface IProps {
  multiline?: boolean;
  label: string;
  textValue: { value: string; setValue: React.Dispatch<React.SetStateAction<string>> };
}

const TranslateTextField: React.FC<IProps> = ({ multiline, label, textValue }) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    textValue.setValue(evt.target.value);
  };

  return (
    <TextField
      multiline={multiline}
      label={label}
      value={textValue.value}
      onChange={handleChange}
      size="small"
      sx={{ minWidth: 100, flexGrow: 1, flexBasis: multiline ? "100%" : undefined }}
    />
  );
};

export default TranslateTextField;
