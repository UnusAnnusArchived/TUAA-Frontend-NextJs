import { Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { colorSchemeAtom } from "../../src/atoms";

const ColorSchemeToggle: React.FC = () => {
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);

  const lightMode = () => {
    setColorScheme("light");
  };

  const darkMode = () => {
    setColorScheme("dark");
  };

  return (
    <>
      <Typography>{colorScheme}</Typography>
      <button onClick={lightMode}>light</button>
      <button onClick={darkMode}>dark</button>
    </>
  );
};

export default ColorSchemeToggle;
