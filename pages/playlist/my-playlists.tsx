import { GetServerSideProps, NextPage } from "next";
import { Layout } from "../../components/layout/index";
import { MetaHead } from "../../components/meta-head";
import { Paper, Typography } from "@mui/material";
import { IPlaylist, IVideo } from "../../src/types";
import pb from "../../src/pocketbase";
import Link from "next/link";
import { ListResult } from "pocketbase";
import config from "../../src/config.json";
import fs from "fs/promises";
import { ThumbnailImage } from "../../components/thumbnail-image/thumbnail-image";

interface IProps {
  playlists: IPlaylist[];
  playlistsFirstEpisode: IVideo[];
}

const MyPlaylists: NextPage<IProps> = ({ playlists, playlistsFirstEpisode }) => {
  return (
    <Layout>
      <MetaHead baseTitle="My Playlists" />
      <Typography variant="h4" component="h2">
        My Playlists
      </Typography>
      <div>
        <div className="row">
          {playlists.map((playlist, index) => {
            return (
              <div className="col-12 col-md-4 p-2" key={index}>
                <Link href={`/playlist/${playlist.id}`} passHref>
                  <div className="pointer h-100">
                    <Paper className="p-2 h-100">
                      <div className="ratio ratio-16x9">
                        <ThumbnailImage
                          video={playlistsFirstEpisode[index]}
                          alt=""
                          objectFit="cover"
                          objectPosition="center center"
                          quality={100}
                          layout="fill"
                        />
                      </div>
                      <div className="text-center mt-2">
                        <Typography variant="body1">{playlist.name}</Typography>
                      </div>
                      <div className="text-center mt-2">
                        <Typography variant="body2"></Typography>
                      </div>
                    </Paper>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default MyPlaylists;

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  try {
    const playlists: ListResult<IPlaylist> = await pb.send(`/api/collections/user_playlists/records?perPage=400`, {
      headers: {
        Authorization: JSON.parse(decodeURIComponent(ctx.req.cookies.pb_auth)).token,
      },
    });

    const playlistsFirstEpisode: IVideo[] = [];

    for (let i = 0; i < playlists.items.length; i++) {
      const episodeId = playlists.items[i].episodes.split(",")[0];
      const split = episodeId.split(".");
      const season = split[0].replace("s", "");
      const episode = split[1].replace("e", "");

      const path = `${config.metadataPath}/${season}/${episode}.json`;

      try {
        const video: IVideo = JSON.parse(await fs.readFile(path, "utf-8"));
        playlistsFirstEpisode.push(video);
      } catch {
        playlistsFirstEpisode.push({
          _metadataVersion: 3,
          title: "Could not find video!",
          description: "",
          season: parseInt(season),
          episode: parseInt(episode),
          date: 0,
          sources: [],
          uaid: "",
        });
      }
    }

    return {
      props: {
        playlists: playlists.items,
        playlistsFirstEpisode,
      },
    };
  } catch {
    return { props: { playlists: null }, redirect: { destination: "/login", permanent: false } };
  }
};
