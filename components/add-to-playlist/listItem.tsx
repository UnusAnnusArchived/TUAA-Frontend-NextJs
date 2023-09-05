import React, { useEffect, useState } from "react";
import { IMetadataV3, IPlaylist } from "../../src/types";
import { Radio, ListItem as MuiListItem, ListItemButton, ListItemIcon, Skeleton, ListItemText } from "@mui/material";
import endpoints from "../../src/endpoints.json";
import { Add } from "@mui/icons-material";

interface IProps {
  selectedPlaylistId: string;
  setSelectedPlaylistId: React.Dispatch<React.SetStateAction<string>>;
  playlist: IPlaylist;
  isAddPlaylist?: boolean;
}

const ListItem: React.FC<IProps> = ({ selectedPlaylistId, setSelectedPlaylistId, playlist, isAddPlaylist }) => {
  const [firstVideo, setFirstVideo] = useState<IMetadataV3>();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isAddPlaylist) {
        setFirstVideo(
          await fetch(`/api/v3/metadata/3/episode/${playlist.episodes.split(",")[0]}`).then((res) => res.json())
        );
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
                src={`${endpoints.cdn}${firstVideo?.thumbnails?.webp.src}`}
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
