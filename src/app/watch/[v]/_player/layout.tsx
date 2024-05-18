import { DefaultVideoLayout } from "@vidstack/react/player/layouts/default";
import PreviousEpisode from "./previousEpisode";
import NextEpisode from "./nextEpisode";
import SourceMenu from "./sourceMenu";
import { IMetadata } from "@/zodTypes";
import {
  Audiotrack,
  Cast,
  CastConnected,
  ChevronLeft,
  ChevronRight,
  FontDownload,
  Forward10,
  Fullscreen,
  FullscreenExit,
  Pause,
  PictureInPictureAlt,
  PlayArrow,
  Replay,
  Replay10,
  Settings,
  Speed,
  Subtitles,
  SubtitlesOff,
  Tune,
  VolumeDown,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { useTolgee } from "@tolgee/react";
import AutoplayToggle from "./autoplayToggle";

interface IProps {
  episode: IMetadata;
  srcId: string;
  switchSources: (srcId: string) => void;
}

const PlayerLayout: React.FC<IProps> = ({ episode, srcId, switchSources }) => {
  const { t } = useTolgee(["language"]);

  return (
    <DefaultVideoLayout
      slots={{
        beforePlayButton: <PreviousEpisode />,
        afterPlayButton: <NextEpisode />,
        beforeSettingsMenuStartItems: (
          <SourceMenu externalSources={episode.externalSources} srcId={srcId} switchSources={switchSources} />
        ),
        afterPlaybackMenuLoop: <AutoplayToggle />,
      }}
      icons={{
        PlayButton: { Play: PlayArrow as any, Pause: Pause as any, Replay: Replay as any },
        MuteButton: { Mute: VolumeOff as any, VolumeHigh: VolumeUp as any, VolumeLow: VolumeDown as any },
        Menu: {
          Settings: Settings as any,
          ArrowLeft: ChevronLeft as any,
          ArrowRight: ChevronRight as any,
          Audio: Audiotrack as any,
          Captions: Subtitles as any,
          Chapters: () => <></>,
          Font: FontDownload as any,
          Quality: Tune as any,
          Speed: Speed as any,
        },
        AirPlayButton: {
          Default: Cast as any,
          Connected: CastConnected as any,
          Connecting: CastConnected as any,
        },
        CaptionButton: {
          Off: SubtitlesOff as any,
          On: Subtitles as any,
        },
        FullscreenButton: {
          Enter: Fullscreen as any,
          Exit: FullscreenExit as any,
        },
        GoogleCastButton: {
          Default: Cast as any,
          Connected: CastConnected as any,
          Connecting: CastConnected as any,
        },
        PIPButton: {
          Enter: PictureInPictureAlt as any,
          Exit: PictureInPictureAlt as any,
        },
        SeekButton: {
          Forward: Forward10 as any,
          Backward: Replay10 as any,
        },
        KeyboardAction: {
          CaptionsOff: SubtitlesOff as any,
          CaptionsOn: Subtitles as any,
          EnterFullscreen: Fullscreen as any,
          EnterPiP: PictureInPictureAlt as any,
          ExitFullscreen: FullscreenExit as any,
          ExitPiP: PictureInPictureAlt as any,
          Mute: VolumeOff as any,
          Pause: Pause as any,
          Play: PlayArrow as any,
          SeekBackward: Replay10 as any,
          SeekForward: Forward10 as any,
          VolumeDown: VolumeDown as any,
          VolumeUp: VolumeUp as any,
        },
      }}
      translations={{
        "Background Color": t("vidstack.font.backgroundColor"),
        "Background Opacity": t("vidstack.font.backgroundOpacity"),
        "Closed-Captions Off": t("vidstack.closedCaptionsOff"),
        "Closed-Captions On": t("vidstack.closedCaptionsOn"),
        "Display Background Color": t("vidstack.font.displayBackgroundColor"),
        "Display Background Opacity": t("vidstack.font.displayBackgroundColor"),
        "Enter Fullscreen": t("vidstack.enterFullscreen"),
        "Enter PiP": t("vidstack.enterPip"),
        "Exit Fullscreen": t("vidstack.exitFullscreen"),
        "Exit PiP": t("vidstack.exitPip"),
        "Font Family": t("vidstack.font.fontFamily"),
        "Font Size": t("vidstack.font.fontSize"),
        "Font Styles": t("vidstack.font.fontStyles"),
        "Google Cast": t("vidstack.remote.googleCast"),
        "Seek Backward": t("vidstack.seekBackward"),
        "Seek Forward": t("vidstack.seekForward"),
        "Skip To Live": t("vidstack.skipToLive"),
        "Text Color": t("vidstack.font.textColor"),
        "Text Opacity": t("vidstack.font.textOpacity"),
        "Text Shadow": t("vidstack.font.textShadow"),
        AirPlay: t("vidstack.remote.airplay"),
        Audio: t("vidstack.audio"),
        Auto: t("vidstack.auto"),
        Black: t("vidstack.colors.black"),
        Blue: t("vidstack.colors.blue"),
        Captions: t("vidstack.captions"),
        Chapters: t("vidstack.chapters"),
        Connected: t("vidstack.remote.connected"),
        Connecting: t("vidstack.remote.connecting"),
        Continue: t("vidstack.continue"),
        Cyan: t("vidstack.colors.cyan"),
        Default: t("vidstack.default"),
        Disconnected: t("vidstack.remote.disconnected"),
        Fullscreen: t("vidstack.fullscreen"),
        Green: t("vidstack.colors.green"),
        LIVE: t("vidstack.live"),
        Magenta: t("vidstack.colors.magenta"),
        Mute: t("vidstack.mute"),
        Normal: t("vidstack.normal"),
        Off: t("vidstack.off"),
        Pause: t("vidstack.pause"),
        PiP: t("vidstack.pip"),
        Play: t("vidstack.play"),
        Quality: t("vidstack.quality"),
        Red: t("vidstack.colors.red"),
        Replay: t("vidstack.replay"),
        Reset: t("vidstack.reset"),
        Seek: t("vidstack.seek"),
        Settings: t("vidstack.settings"),
        Speed: t("vidstack.speed"),
        Unmute: t("vidstack.unmute"),
        Volume: t("vidstack.volume"),
        White: t("vidstack.colors.white"),
        Yellow: t("vidstack.colors.yellow"),
      }}
    />
  );
};

export default PlayerLayout;
