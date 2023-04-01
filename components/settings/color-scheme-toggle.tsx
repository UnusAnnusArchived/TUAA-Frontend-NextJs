import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { colorSchemeAtom } from "../../src/atoms";
import { IColorScheme } from "../../src/types";
import { MouseEventHandler, useState } from "react";
import AprilFoolsDialog from "../april-fools-dialog";
import classNames from "classnames";

const ColorSchemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [runAnimation, setRunAnimation] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  const handleChange = (evt: SelectChangeEvent<"light" | "dark">) => {
    setColorScheme(evt.target.value as IColorScheme);
  };

  const handleMouseIn: MouseEventHandler<HTMLDivElement> = () => {
    if (!runAnimation) {
      setRunAnimation(true);
      setTimeout(() => {
        setAnimationFinished(true);
        setDialogOpen(true);
      }, 5000);
    }
  };

  return (
    <>
      <AprilFoolsDialog open={dialogOpen} setOpen={setDialogOpen} />
      <FormControl
        className={classNames(
          runAnimation ? "april-fools-animation" : undefined,
          animationFinished ? "april-fools-animation-finished" : undefined
        )}
        onMouseEnter={handleMouseIn}
      >
        <InputLabel>{t("settings:color_scheme:label")}</InputLabel>
        <Select label={t("settings:color_scheme:label")} value={colorScheme}>
          {colorScheme === "light" ? (
            <MenuItem value="light">{t("settings:color_scheme:light")}</MenuItem>
          ) : (
            <MenuItem value="dark">{t("settings:color_scheme:dark")}</MenuItem>
          )}
          {/* <MenuItem value="dark">{t("settings:color_scheme:dark")}</MenuItem>
        <MenuItem value="light">{t("settings:color_scheme:light")}</MenuItem> */}
        </Select>
      </FormControl>
    </>
  );
};

export default ColorSchemeToggle;
