"use client";

import { DefaultVideoLayout } from "@vidstack/react/player/layouts/default";
import { PreviousEpisode, NextEpisode } from "./navigateEpisodes";
import SourceMenu from "./sourceMenu";
import { IDirectResolution, IDirectSource, IMetadata } from "@/zodTypes";
import { useTolgee } from "@tolgee/react";
import AutoplayToggle from "./autoplayToggle";
import icons from "./icons";
import getTranslations from "./getTranslations";
import DirectResolutionSwitcher from "./directResolutionSwitcher";
import getEpisodeLinks from "@/tools/getEpisodeLinks";
import { useEffect, useState } from "react";
import endpoints from "@/endpoints.json";
import DownloadButton from "./downloadButton";

interface IProps {
  episode: IMetadata;
  srcId: string;
  switchSources: (srcId: string) => void;
  currentResolutionWidth: number;
  setResolutionWidth: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerLayout: React.FC<IProps> = ({
  episode,
  srcId,
  switchSources,
  currentResolutionWidth,
  setResolutionWidth,
}) => {
  const { t } = useTolgee(["language"]);
  const { seek: originalSeek, download } = getEpisodeLinks(episode.uaid);
  const [customSeek, setCustomSeek] = useState<string>();

  useEffect(() => {
    (async () => {
      const seek = await fetch(originalSeek).then((res) => res.text());

      const newSeek = seek.replaceAll(endpoints.cdn, `${endpoints.api}/getSeekImage?path=`);

      const blob = new Blob([newSeek]);
      const url = URL.createObjectURL(blob);
      setCustomSeek(url);
    })();
  }, []);

  return (
    <DefaultVideoLayout
      slots={{
        downloadButton: <DownloadButton url={download} uaid={episode.uaid} />,
        beforePlayButton: <PreviousEpisode episode={episode} />,
        afterPlayButton: <NextEpisode episode={episode} />,
        beforeSettingsMenuStartItems: (
          <SourceMenu externalSources={episode.externalSources} srcId={srcId} switchSources={switchSources} />
        ),
        afterPlaybackMenuLoop: <AutoplayToggle disabled />,
        beforePlaybackMenuItemsEnd:
          srcId !== "youtube" && srcId !== "tuaa" ? (
            <DirectResolutionSwitcher
              resolutions={
                (
                  episode.externalSources!.find(
                    (source) => source.type === "direct" && source.id === srcId
                  ) as IDirectSource
                ).resolutions
              }
              currentResolutionWidth={currentResolutionWidth}
              setResolutionWidth={setResolutionWidth}
            />
          ) : undefined,
      }}
      download={{ url: download, filename: `${episode.uaid}.mp4` }}
      thumbnails={customSeek}
      icons={icons}
      translations={getTranslations(t)}
    />
  );
};

export default PlayerLayout;
