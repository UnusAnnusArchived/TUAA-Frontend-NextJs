import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { colorSchemeAtom } from "../../src/atoms";
import { IColorScheme } from "../../src/types";

const ColorSchemeToggle: React.FC = () => {
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);

  const lightMode = () => {
    setColorScheme("light");
  };

  const darkMode = () => {
    setColorScheme("dark");
  };

  const handleChange = (evt: SelectChangeEvent<"light" | "dark">) => {
    setColorScheme(evt.target.value as IColorScheme);
  };

  return (
    <FormControl>
      <InputLabel>Color Scheme</InputLabel>
      <Select label="Color Scheme" onChange={handleChange} value={colorScheme}>
        <MenuItem value="dark">Dark Mode</MenuItem>
        <MenuItem value="light">Light Mode</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ColorSchemeToggle;
