import {
  ArrowLeft,
  ArrowRight,
  Audiotrack,
  Bookmarks,
  Cast,
  CastConnected,
  ChevronLeft,
  ChevronRight,
  DisplaySettings,
  Download,
  Forward10,
  Fullscreen,
  FullscreenExit,
  Opacity,
  OpacityTwoTone,
  Pause,
  PictureInPictureAlt,
  PlayArrow,
  RadioButtonChecked,
  Replay,
  Replay10,
  Settings,
  SettingsAccessibility,
  Subtitles,
  SubtitlesOff,
  TextDecrease,
  TextIncrease,
  VolumeDown,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { DefaultLayoutIcons } from "@vidstack/react/player/layouts/default";

const icons: DefaultLayoutIcons = {
  PlayButton: { Play: PlayArrow as any, Pause: Pause as any, Replay: Replay as any },
  MuteButton: { Mute: VolumeOff as any, VolumeHigh: VolumeUp as any, VolumeLow: VolumeDown as any },
  Menu: {
    Settings: Settings as any,
    ArrowLeft: ChevronLeft as any,
    ArrowRight: ChevronRight as any,
    Audio: Audiotrack as any,
    Captions: Subtitles as any,
    Chapters: Bookmarks as any,
    Accessibility: SettingsAccessibility as any,
    AudioBoostDown: VolumeDown as any,
    AudioBoostUp: VolumeUp as any,
    FontSizeDown: TextDecrease as any,
    FontSizeUp: TextIncrease as any,
    OpacityDown: Opacity as any,
    OpacityUp: OpacityTwoTone as any,
    Playback: DisplaySettings as any,
    QualityDown: ArrowLeft as any,
    QualityUp: ArrowRight as any,
    RadioCheck: RadioButtonChecked as any,
    SpeedDown: ArrowLeft as any,
    SpeedUp: ArrowRight as any,
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
  DownloadButton: Download as any,
  KeyboardDisplay: {
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
};

export default icons;