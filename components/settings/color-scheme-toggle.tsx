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

const ColorSchemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);

  const handleChange = (evt: SelectChangeEvent<"light" | "dark">) => {
    setColorScheme(evt.target.value as IColorScheme);
  };

  return (
    <FormControl>
      <InputLabel>{t("settings:color_scheme:label")}</InputLabel>
      <Select label={t("settings:color_scheme:label")} onChange={handleChange} value={colorScheme}>
        <MenuItem value="dark">{t("settings:color_scheme:dark")}</MenuItem>
        <MenuItem value="light">{t("settings:color_scheme:light")}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ColorSchemeToggle;
