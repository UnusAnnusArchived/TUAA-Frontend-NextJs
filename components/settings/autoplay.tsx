import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState } from "recoil";
import { autoplayAtom } from "../../src/atoms";

const Autoplay: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [autoplay, setAutoplay] = useRecoilState(autoplayAtom);

  // console.log(autoplay);

  const autoplayEnabled = !!autoplay;
  
  const handleClick = () => {
    setAutoplay(!autoplay);
  };

  return (
    <FormControlLabel control={
      <Checkbox checked={(() => {
        console.log(autoplayEnabled);
        return autoplayEnabled;
      })()} />
    } label={t("settings:autoplay") as string} onChange={handleClick} />
  );
};

export default Autoplay;
