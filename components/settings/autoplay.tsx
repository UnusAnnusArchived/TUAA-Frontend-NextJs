import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState } from "recoil";
import { autoplayAtom } from "../../src/atoms";

const Autoplay: React.FC = () => {
  const { t } = useTranslation();
  const [autoplay, setAutoplay] = useRecoilState(autoplayAtom);

  const handleClick = (_, checked: boolean) => {
    setAutoplay(checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={autoplay} defaultChecked={autoplay} />}
      label={t("settings:autoplay") as string}
      onChange={handleClick}
    />
  );
};

export default Autoplay;
