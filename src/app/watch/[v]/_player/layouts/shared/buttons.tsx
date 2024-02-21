import {
  Subtitles,
  SubtitlesOff,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  VolumeOff,
  VolumeDown,
  VolumeUp,
  Pause,
  PlayArrow,
  OpenInNew,
  PictureInPictureAlt,
  Replay10,
  Forward10,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import { IconButton, Tooltip, TooltipProps } from "@mui/material";
import { useTranslate } from "@tolgee/react";
import {
  CaptionButton,
  FullscreenButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  SeekButton,
  useCaptionOptions,
  useMediaState,
} from "@vidstack/react";

export interface MediaButtonProps {
  tooltipPlacement: TooltipProps["placement"];
}

export function Play({ tooltipPlacement }: MediaButtonProps) {
  const { t } = useTranslate();

  const isPaused = useMediaState("paused");
  return (
    <Tooltip title={isPaused ? t("vidstack.play") : t("vidstack.pause")} placement={tooltipPlacement}>
      <PlayButton style={{ all: "unset" }}>
        <IconButton>{isPaused ? <PlayArrow /> : <Pause />}</IconButton>
      </PlayButton>
    </Tooltip>
  );
}

export function PreviousEpisode({ tooltipPlacement }: MediaButtonProps) {
  const { t } = useTranslate();

  return (
    <Tooltip title={t("vidstack.previousEpisode")} placement={tooltipPlacement}>
      <IconButton>
        <SkipPrevious />
      </IconButton>
    </Tooltip>
  );
}

export function NextEpisode({ tooltipPlacement }: MediaButtonProps) {
  const { t } = useTranslate();

  return (
    <Tooltip title={t("vidstack.nextEpisode")} placement={tooltipPlacement}>
      <IconButton>
        <SkipNext />
      </IconButton>
    </Tooltip>
  );
}

export function Mute({ tooltipPlacement }: MediaButtonProps) {
  const { t } = useTranslate();

  const volume = useMediaState("volume");
  const isMuted = useMediaState("muted");
  return (
    <Tooltip title={isMuted ? t("vidstack.unmute") : t("vidstack.mute")} placement={tooltipPlacement}>
      <MuteButton style={{ all: "unset" }}>
        <IconButton>{isMuted || volume == 0 ? <VolumeOff /> : volume < 0.5 ? <VolumeDown /> : <VolumeUp />}</IconButton>
      </MuteButton>
    </Tooltip>
  );
}

export function Caption({ tooltipPlacement }: MediaButtonProps) {
  const { t } = useTranslate();

  const track = useMediaState("textTrack");
  const options = useCaptionOptions();

  const isOn = track && isTrackCaptionKind(track);
  if (!options.disabled) {
    return (
      <Tooltip
        title={isOn ? t("vidstack.closedCaptionsOff") : t("vidstack.closedCaptionsOn")}
        placement={tooltipPlacement}
      >
        <CaptionButton style={{ all: "unset" }}>
          <IconButton>{isOn ? <SubtitlesOff /> : <Subtitles />}</IconButton>
        </CaptionButton>
      </Tooltip>
    );
  }
}

export function PIP({ tooltipPlacement }: MediaButtonProps) {
  const { t } = useTranslate();

  const isActive = useMediaState("pictureInPicture");
  return (
    <Tooltip title={isActive ? t("vidstack.exitPiP") : t("vidstack.enterPiP")} placement={tooltipPlacement}>
      <PIPButton style={{ all: "unset" }}>
        <IconButton>{isActive ? <OpenInNew /> : <PictureInPictureAlt />}</IconButton>
      </PIPButton>
    </Tooltip>
  );
}

export function Fullscreen({ tooltipPlacement }: MediaButtonProps) {
  const { t } = useTranslate();

  const isActive = useMediaState("fullscreen");
  return (
    <Tooltip
      title={isActive ? t("vidstack.exitFullscreen") : t("vidstack.enterFullscreen")}
      placement={tooltipPlacement}
    >
      <FullscreenButton style={{ all: "unset" }}>
        <IconButton>{isActive ? <FullscreenExitIcon /> : <FullscreenIcon />}</IconButton>
      </FullscreenButton>
    </Tooltip>
  );
}

export interface SeekButtonProps extends MediaButtonProps {
  seconds: number;
}

export function Seek({ seconds, tooltipPlacement }: SeekButtonProps) {
  const { t } = useTranslate();

  const isBackward = seconds < 0;
  return (
    <Tooltip title={isBackward ? t("vidstack.seekBackward") : t("vidstack.seekForward")} placement={tooltipPlacement}>
      <SeekButton seconds={seconds} style={{ all: "unset" }}>
        <IconButton>{isBackward ? <Replay10 /> : <Forward10 />}</IconButton>
      </SeekButton>
    </Tooltip>
  );
}
