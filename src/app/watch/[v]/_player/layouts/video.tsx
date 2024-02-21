import styles from "./video-layout.module.css";

import { Captions, ChapterTitle, Controls, Gesture } from "@vidstack/react";

import * as Buttons from "./shared/buttons";
import * as Menus from "./shared/menus";
import * as Sliders from "./shared/sliders";
import { TimeGroup } from "./shared/time-group";

export interface VideoLayoutProps {
  thumbnails?: string;
}

export function VideoLayout({ thumbnails }: VideoLayoutProps) {
  return (
    <div style={{ aspectRatio: 16 / 9, width: "100%", height: "auto" }}>
      <Gestures />
      <Captions className={`${styles.captions} vds-captions`} />
      <Controls.Root className={`${styles.controls} vds-controls`}>
        <div className="vds-controls-spacer" />
        <div style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)" }}>
          <Controls.Group className={`${styles.controlsGroup} vds-controls-group`}>
            <Sliders.Time thumbnails={thumbnails} />
          </Controls.Group>
          <Controls.Group className={`${styles.controlsGroup} vds-controls-group`}>
            <Buttons.PreviousEpisode tooltipPlacement="top" />
            <Buttons.Play tooltipPlacement="top" />
            <Buttons.NextEpisode tooltipPlacement="top" />
            <Buttons.Mute tooltipPlacement="top" />
            <Sliders.Volume />
            <TimeGroup />
            <ChapterTitle className="vds-chapter-title" />
            <div className="vds-controls-spacer" />
            <Buttons.Caption tooltipPlacement="top" />
            <Menus.Settings />
            <Buttons.PIP tooltipPlacement="top" />
            <Buttons.Fullscreen tooltipPlacement="top" />
          </Controls.Group>
        </div>
      </Controls.Root>
    </div>
  );
}

function Gestures() {
  return (
    <>
      <Gesture className={styles.gesture} event="pointerup" action="toggle:paused" />
      <Gesture className={styles.gesture} event="dblpointerup" action="toggle:fullscreen" />
      <Gesture className={styles.gesture} event="pointerup" action="toggle:controls" />
      <Gesture className={styles.gesture} event="dblpointerup" action="seek:-10" />
      <Gesture className={styles.gesture} event="dblpointerup" action="seek:10" />
    </>
  );
}
