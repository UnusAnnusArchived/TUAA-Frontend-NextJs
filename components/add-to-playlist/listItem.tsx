import React, { useEffect, useState } from "react";
import { IPlaylist, IVideo } from "../../src/types";
import { Radio, ListItem as MuiListItem, ListItemButton, ListItemIcon, Skeleton, ListItemText } from "@mui/material";
import endpoints from "../../src/endpoints.json";
import { Add } from "@mui/icons-material";
import { Video } from "bunny-stream";
import axios from "axios";
import getBunnyEpisodeLinks from "../../src/utils/getBunnyLinks";
import getBunnyEpisode from "../../pages/api/bunny-api-temporary/get-episode/[guid]";

interface IProps {
  selectedPlaylistId: string;
  setSelectedPlaylistId: React.Dispatch<React.SetStateAction<string>>;
  playlist: IPlaylist;
  isAddPlaylist?: boolean;
}

const ListItem: React.FC<IProps> = ({ selectedPlaylistId, setSelectedPlaylistId, playlist, isAddPlaylist }) => {
  const [firstVideo, setFirstVideo] = useState<IVideo>();
  const [firstVideoBunny, setFirstVideoBunny] = useState<Video>();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isAddPlaylist) {
        const firstVideo: IVideo = await fetch(
          `/api/v2/metadata/episode/${playlist.episodes === "" ? [] : playlist.episodes.split(",")[0]}`
        ).then((res) => res.json());

        const bunny: Video = (
          await axios(
            `/api/bunny-api-temporary/get-episode/${
              firstVideo.sources.find((source) => source.type === "bunny")!.bunnyId
            }`
          )
        ).data;

        setFirstVideo(firstVideo);
        setFirstVideoBunny(bunny);
      }
    })();
  }, [playlist]);

  return (
    <MuiListItem
      key={playlist.id}
      secondaryAction={
        <Radio
          value={playlist.id}
          checked={selectedPlaylistId === playlist.id}
          edge="end"
          onClick={() => {
            setSelectedPlaylistId(playlist.id);
          }}
        />
      }
      disablePadding
    >
      <ListItemButton
        onClick={() => {
          setSelectedPlaylistId(playlist.id);
        }}
        disableGutters
      >
        <ListItemIcon>
          {isAddPlaylist ? (
            <div
              style={{
                height: 72,
                aspectRatio: `${16 / 9}`,
                marginRight: "16px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Add sx={{ fontSize: "3rem" }} />
            </div>
          ) : (
            <>
              {!imgLoaded && (
                <Skeleton variant="rectangular" sx={{ height: 72, aspectRatio: `${16 / 9}`, marginRight: "16px" }} />
              )}
              <img
                onLoad={() => {
                  setImgLoaded(true);
                }}
                src={firstVideoBunny ? getBunnyEpisodeLinks(firstVideoBunny).thumbnail : ""}
                style={{ height: 72, aspectRatio: 16 / 9, marginRight: 16, display: imgLoaded ? undefined : "none" }}
              />
            </>
          )}
        </ListItemIcon>
        <ListItemText
          primary={playlist.name}
          secondary={playlist.description}
          secondaryTypographyProps={{
            sx: { textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" },
          }}
        />
      </ListItemButton>
    </MuiListItem>
  );
};

export default ListItem;
