import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import ThemeToggle from "./themeToggle";
import { Menu, MobileMenu } from "./menu";
import Title from "./title";
import SearchButton from "./search/searchButton";
import { SearchBarIsOpenProvider } from "@/contexts/searchBarOpenContext";
import { DesktopSearchBar, MobileSearchBar } from "./search/searchBar";
import { SearchButtonCoordsProvider } from "@/contexts/searchButtonCoordsContext";
import LangSwitcher from "./langSwitcher";

const AppBar: React.FC = () => {
  return (
    <SearchBarIsOpenProvider>
      <SearchButtonCoordsProvider>
        <MuiAppBar>
          <Toolbar sx={{ flexDirection: "row", alignItems: "center" }}>
            <Title />

            <DesktopSearchBar />
            <MobileSearchBar />

            <Menu />

            <SearchButton />
            <LangSwitcher />
            <ThemeToggle />
            <MobileMenu />
          </Toolbar>
        </MuiAppBar>
      </SearchButtonCoordsProvider>
    </SearchBarIsOpenProvider>
  );
};

export default AppBar;
