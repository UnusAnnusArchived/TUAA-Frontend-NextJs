import fs from "fs";
import config from "../../../src/config.json";
import type ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import type ***REMOVED*** IRokuFeed, IRokuEpisode, IVideo ***REMOVED*** from "../../../src/types";

export default function feed(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  var allMetadata:IVideo[][] = [[], []];

  const s00 = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/00`);
  for (var i = 0; i < s00.length; i++) ***REMOVED***
    allMetadata[0].push(JSON.parse(fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/00/$***REMOVED***s00[i]***REMOVED***`, "utf-8")));
***REMOVED***

  const s01 = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/01`);
  for (var i = 0; i < s01.length; i++) ***REMOVED***
    allMetadata[1].push(JSON.parse(fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/01/$***REMOVED***s01[i]***REMOVED***`, "utf-8")));
***REMOVED***

  res.send(<IRokuFeed>***REMOVED***
    providerName: "The Unus Annus Archive",
    lastUpdated: new Date().toISOString(),
    language: "en",
    playlists: [
      ***REMOVED***
        name: "Specials",
        itemIds: allMetadata[0].map((episode) => ***REMOVED***
          return `s$***REMOVED***episode.season.toString().padStart (2, "0")***REMOVED***.e$***REMOVED***episode.episode.toString().padStart(3, "0")***REMOVED***`;
    ***REMOVED***)
    ***REMOVED***
      ***REMOVED***
        name: "Season 1",
        itemIds: allMetadata[1].map((episode) => ***REMOVED***
          return `s$***REMOVED***episode.season.toString().padStart(2, "0")***REMOVED***.e$***REMOVED***episode.episode.toString().padStart(3, "0")***REMOVED***`;
    ***REMOVED***)
  ***REMOVED***
    ],
    series: [
      ***REMOVED***
        id: "UnusAnnus",
        title: "Unus Annus",
        seasons: [
          ***REMOVED***
            seasonNumber: "0",
            episodes: genSeason(0)
        ***REMOVED***
          ***REMOVED***
            seasonNumber: "1",
            episodes: genSeason(1)
      ***REMOVED***
        ],
        genres: ["comedy"],
        thumbnail: "https://cdn.unusann.us/roku-assets/series-thumbnail.jpg",
        releaseDate: new Date(allMetadata[1][0].date || allMetadata[1][0].releasedate).toISOString().split("T")[0],
        shortDescription: "What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be...",
        longDescription: "What would you do if you only had a year left to live? Would you squander the time you were given? Or would you make every second count? Welcome to Unus Annus. In exactly 365 days this channel will be deleted along with all of the daily uploads accumulated since then. Nothing will be saved. Nothing will be reuploaded. This is your one chance to join us at the onset of our adventure. To be there from the beginning. To make every second count. Subscribe now and relish what little time we have left or have the choice made for you as we disappear from existence forever. But remember... everything has an end. Even you. Memento mori. Unus annus."
  ***REMOVED***
    ]
***REMOVED***);

  function genSeason(season:0|1) ***REMOVED***
    return allMetadata[season].map((episode:IVideo) => ***REMOVED***
      return <IRokuEpisode>***REMOVED***
        id: `s$***REMOVED***episode.season.toString().padStart(2, "0")***REMOVED***.e$***REMOVED***episode.episode.toString().padStart(3, "0")***REMOVED***`,
        title: episode.title,
        content: ***REMOVED***
          dateAdded: new Date(episode.date || episode.releasedate).toISOString(),
          videos: episode.video ? [***REMOVED***url: `https://$***REMOVED***episode.video***REMOVED***`, quality: "FHD", videoType: episode.video.split(".")[episode.video.split(".").length-1].toUpperCase()***REMOVED***] : episode.sources.map((source) => ***REMOVED***
            return ***REMOVED***
              url: `https:$***REMOVED***source.src***REMOVED***`,
              quality: source.size < 720 ? "SD" : source.size < 1080 ? "HD" : source.size < 2160 ? "FHD" : "UHD",
              videoType: source.type.split("/")[1].toUpperCase()
        ***REMOVED***;
      ***REMOVED***),
          duration: episode.duration || 43208,
          captions: episode.tracks?.map((track) => ***REMOVED***
            if (track.kind === "captions") ***REMOVED***
              return ***REMOVED***
                url: `https:$***REMOVED***track.src***REMOVED***`,
                language: track.srcLang,
                captionType: "SUBTITLE"
          ***REMOVED***;
        ***REMOVED*** else ***REMOVED***
              return undefined;
        ***REMOVED***
      ***REMOVED***),
          language: "en"
      ***REMOVED***
        thumbnail: `https:$***REMOVED***episode.thumbnail?.replace(".webp", ".jpg") || episode.posters[1].src***REMOVED***`,
        releaseDate: new Date(episode.date || episode.releasedate).toISOString().split("T")[0],
        episodeNumber: episode.episode,
        shortDescription: episode.description === "" ? "This episode doesn\"t have a description." : episode.description.length > 197 ? `$***REMOVED***episode.description.substr(0, 197)***REMOVED***...` : episode.description,
        longDescription: episode.description.length > 197 ? episode.description : undefined
  ***REMOVED***;
***REMOVED***);
***REMOVED***
***REMOVED***
