import type { ReactNode } from "react";

import { useCaptionOptions, useVideoQualityOptions } from "@vidstack/react";
import React, { createContext, useContext, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  DisplaySettings,
  Subtitles,
  Settings as SettingsIcon,
  Language,
  Tune,
  Check,
  Sd,
  Hd,
  FourK,
} from "@mui/icons-material";
import { playerContext, sourceIdContext } from "../..";
import {
  MenuItem,
  Paper,
  useTheme,
  IconButton,
  Tooltip,
  TooltipProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Slide,
  Fade,
  ListItemSecondaryAction,
} from "@mui/material";
import { useTranslate } from "@tolgee/react";
import { IDirectSource, ISource } from "@/zodTypes";

const currentPageContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([
  "home",
  () => "home",
]);

export function Settings() {
  const theme = useTheme();
  const { t } = useTranslate();
  const anchorEl = useRef<HTMLButtonElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const handleToggleSettingsOpen = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleCloseSettings = () => {
    setCurrentPage("home");
    setSettingsOpen(false);
  };

  return (
    <currentPageContext.Provider value={[currentPage, setCurrentPage]}>
      <Tooltip title={t("vidstack.settings")} placement="top">
        <IconButton ref={anchorEl} onClick={handleToggleSettingsOpen}>
          <SettingsIcon className="vds-rotate-icon" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl?.current}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Fade}
        open={settingsOpen}
        onClose={handleCloseSettings}
      >
        <CaptionSubmenu />
        <SourceSubmenu />
        <ResolutionSubmenu />
      </Menu>
    </currentPageContext.Provider>
  );
}

function CaptionSubmenu() {
  const options = useCaptionOptions();
  const [currentPage, setCurrentPage] = useContext(currentPageContext);
  const { t } = useTranslate();

  if (currentPage === "home" || currentPage === "captions") {
    return (
      <>
        <SubmenuButton
          label={t("vidstack.captions")}
          hint={options.selectedTrack?.label ?? t("vidstack.off")}
          disabled={options.disabled}
          icon={Subtitles}
          pageId="captions"
        />
        {currentPage === "captions" && (
          <List>
            {options.map(({ label, value, select, selected }) => {
              return (
                <ListItemButton
                  onClick={() => {
                    select();
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "0", marginRight: "1rem" }}>{selected && <Check />}</ListItemIcon>
                  <ListItemText primary={label === "Off" ? t("vidstack.off") : label} />
                </ListItemButton>
              );
            })}
          </List>
        )}
      </>
    );
  }
}

const ResolutionSubmenu: React.FC = () => {
  const options = useVideoQualityOptions();
  const { t } = useTranslate();
  const [currentPage, setCurrentPage] = useContext(currentPageContext);

  const resolutionNameMap = {
    "240p": "SD",
    "360p": "SD",
    "480p": "SD",
    "720p": "HD",
    "1080p": "FHD",
    "1440p": "UHD",
    "2160p": "4k",
  } as const;

  const resolutionIconMap = {
    SD: Sd,
    HD: Hd,
    FHD: Hd,
    UHD: Hd,
    "4k": FourK,
  } as const;

  let autoSelected = false;

  if (currentPage === "home" || currentPage === "resolutions") {
    return (
      <>
        <SubmenuButton
          label={t("vidstack.resolution")}
          hint={options.selectedQuality?.height.toString() + "p"}
          disabled={options.disabled}
          icon={Tune}
          pageId="resolutions"
        />
        {currentPage === "resolutions" && (
          <List>
            {options.map(({ label, value, select, selected }) => {
              if (label === "Auto" && selected) {
                autoSelected = true;
              }

              const name = resolutionNameMap[label as keyof typeof resolutionNameMap] ?? "";
              const Icon = resolutionIconMap[name] ?? <p>asdf</p>;

              return (
                <ListItemButton
                  onClick={() => {
                    select();
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label === "Auto" ? t("vidstack.auto") : label} secondary={name} />
                  <ListItemSecondaryAction sx={{ minWidth: "0", marginLeft: "1rem" }}>
                    {selected && (label === "Auto" || autoSelected === false) && <Check />}
                  </ListItemSecondaryAction>
                </ListItemButton>
              );
            })}
          </List>
        )}
      </>
    );
  }

  return <></>;
};

const SourceSubmenu: React.FC = () => {
  const { episode } = useContext(playerContext);
  const [srcId, setSrcId] = useContext(sourceIdContext);
  const [currentPage, setCurrentPage] = useContext(currentPageContext);
  const { t } = useTranslate();

  const getSourceName = (sourceType: string) => {
    switch (sourceType) {
      case "tuaa": {
        return "TUAA";
      }
      case "youtube": {
        return "YouTube";
      }
      default: {
        const source = episode.externalSources?.find(
          (source) => source.type === "direct" && source.id === sourceType
        ) as IDirectSource;

        if (source) {
          return source.name;
        } else {
          return "Unknown";
        }
      }
    }
  };

  const sourceIsSelected = (source: ISource) => {
    switch (srcId) {
      case "youtube": {
        return source.type === "youtube";
      }
      default: {
        return source.type === "direct" && source.id === srcId;
      }
    }
  };

  let currentSourceName = getSourceName(srcId);

  return (
    <>
      <SubmenuButton
        label={t("vidstack.source")}
        hint={currentSourceName}
        disabled={(episode.externalSources?.length ?? 0) < 1}
        icon={Language}
        pageId="sources"
      />
      {currentPage === "sources" && (
        <List>
          {episode.externalSources?.map((source) => {
            console.log(source, "asdf");
            const select = () => {
              if (source.type === "youtube") {
                setSrcId("youtube");
              } else {
                setSrcId(source.id);
              }
            };

            return (
              <ListItemButton onClick={select}>
                <ListItemText primary={getSourceName(source.type)} />
                <ListItemSecondaryAction sx={{ minWidth: "0", marginLeft: "1rem" }}>
                  {sourceIsSelected(source) && <Check />}
                </ListItemSecondaryAction>
              </ListItemButton>
            );
          })}
        </List>
      )}
    </>
  );
};

export interface SubmenuButtonProps {
  label: string;
  hint: string;
  disabled?: boolean;
  icon: React.FC<any>;
  pageId: string;
}

function SubmenuButton({ label, hint, icon: Icon, disabled, pageId }: SubmenuButtonProps) {
  const [currentPage, setCurrentPage] = useContext(currentPageContext);
  const isOpen = currentPage === pageId;

  const toggleCurrentPage = () => {
    console.log(currentPage);
    if (isOpen) {
      setCurrentPage("home");
    } else {
      setCurrentPage(pageId);
    }
  };

  if (!disabled && (currentPage === "home" || currentPage === pageId)) {
    return (
      <MenuItem onClick={toggleCurrentPage}>
        {isOpen && (
          <ListItemIcon sx={{ minWidth: "0", paddingRight: "1rem" }}>
            <ChevronLeft />
          </ListItemIcon>
        )}
        {currentPage === "home" && (
          <ListItemIcon sx={{ minWidth: "0", paddingRight: "1rem" }}>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={label} secondary={currentPage === "home" && hint} />
        {!isOpen && (
          <ListItemIcon sx={{ minWidth: "0", paddingLeft: "1rem" }}>
            <ChevronRight />
          </ListItemIcon>
        )}
      </MenuItem>
    );
  }
  return <></>;
}
