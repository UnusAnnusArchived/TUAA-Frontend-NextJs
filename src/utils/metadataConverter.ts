import type { IMetadataV1, IMetadataV2, IMetadataV3, IMetadataV3TUAASource, IVideo } from "../types";

const main = {
  1: {
    1: v1tov1,
    2: v1tov2,
    3: v1tov3,
    latest: v1tov3,
  },
  2: {
    1: v2tov1,
    2: v2tov2,
    3: v2tov3,
    latest: v2tov3,
  },
  3: {
    1: v3tov1,
    2: v3tov2,
    3: v3tov3,
    latest: v3tov3,
  },
  latest: {
    1: v3tov1,
    2: v3tov2,
    3: v3tov3,
  },
};

export default main;

export function detect(metadata: IVideo): number {
  if (metadata._metadata_version) {
    return metadata._metadata_version;
  }
  if ((metadata as Omit<IMetadataV2, "_metadata_version">).sources) {
    return 2;
  }
  if ((metadata as Omit<IMetadataV1, "_metadata_version">).video) {
    return 1;
  }
}

export function v1tov1(v1: Omit<IMetadataV1, "_metadata_version">): IMetadataV1 {
  return {
    _metadata_version: 1,
    ...v1,
  };
}

export function v1tov2(v1: Omit<IMetadataV1, "_metadata_version">): IMetadataV2 {
  return {
    _metadata_version: 2,
    sources: [
      {
        src: v1.video,
        type: "video/mp4",
        size: 1080,
      },
    ],
    tracks: [],
    posters: [
      {
        src: v1.thumbnail.replace(".webp", ".avif"),
        type: "image/avif",
      },
      {
        src: v1.thumbnail,
        type: "image/webp",
      },
      {
        src: v1.thumbnail.replace(".webp", ".jpg"),
        type: "image/jpeg",
      },
    ],
    season: v1.season,
    episode: v1.episode,
    title: v1.title,
    description: v1.description,
    date: v1.releasedate,
  };
}

export function v1tov3(v1: Omit<IMetadataV1, "_metadata_version">): IMetadataV3 {
  return {
    _metadata_version: 3,
    sources: [
      {
        type: "tuaa",
        id: "tuaa",
        resolutions: [
          {
            src: v1.video,
            size: 1080,
          },
        ],
      },
    ],
    audio: [],
    captions: [],
    thumbnails: {
      avif: {
        src: v1.thumbnail.replace(".webp", ".avif"),
      },
      webp: {
        src: v1.thumbnail,
      },
      jpg: {
        src: v1.thumbnail.replace(".webp", ".jpg"),
      },
    },
    season: v1.season,
    episode: v1.episode,
    title: v1.title,
    description: v1.description,
    date: v1.releasedate,
  };
}

export function v2tov1(v2: Omit<IMetadataV2, "_metadata_version">): IMetadataV1 {
  return {
    _metadata_version: 1,
    video: v2.sources[0].src,
    season: v2.season,
    episode: v2.episode,
    title: v2.title,
    description: v2.description,
    releasedate: v2.date,
    thumbnail: v2.posters.find((poster) => poster.type === "image/webp")?.src ?? v2.posters[0].src,
  };
}

export function v2tov2(v2: Omit<IMetadataV2, "_metadata_version">): IMetadataV2 {
  return {
    _metadata_version: 2,
    ...v2,
  };
}

export function v2tov3(v2: Omit<IMetadataV2, "_metadata_version">): IMetadataV3 {
  return {
    _metadata_version: 3,
    sources: [
      {
        type: "tuaa",
        id: "tuaa",
        resolutions: v2.sources,
      },
    ],
    audio: [],
    captions: v2.tracks.map((track) => {
      return {
        label: track.label,
        srclang: track.srclang,
        src: track.src,
        default: track.srclang === "en",
      };
    }),
    thumbnails: {
      avif: v2.posters.find((poster) => poster.type === "image/avif"),
      webp: v2.posters.find((poster) => poster.type === "image/webp"),
      jpg: v2.posters.find((poster) => poster.type === "image/jpeg"),
    },
    season: v2.season,
    episode: v2.episode,
    title: v2.title,
    description: v2.description,
    date: v2.date,
    duration: v2.duration,
  };
}

export function v3tov1(v3: IMetadataV3): IMetadataV1 {
  return {
    _metadata_version: 1,
    video: (v3.sources.find((source) => source.type === "tuaa") as IMetadataV3TUAASource).resolutions[0].src,
    season: v3.season,
    episode: v3.episode,
    title: v3.title,
    description: v3.description,
    releasedate: v3.date,
    thumbnail: v3.thumbnails.webp.src,
  };
}

export function v3tov2(v3: IMetadataV3): IMetadataV2 {
  return {
    _metadata_version: 2,
    sources: (v3.sources.find((source) => source.type === "tuaa") as IMetadataV3TUAASource).resolutions.map(
      (resolution) => {
        return {
          ...resolution,
          type: "video/mp4",
        };
      }
    ),
    tracks: v3.captions.map((caption) => {
      return {
        kind: "captions",
        label: caption.label,
        srclang: caption.srclang,
        src: caption.src,
      };
    }),
    posters: [
      {
        src: v3.thumbnails.avif.src,
        type: "image/avif",
        size: v3.thumbnails.avif.size,
      },
      {
        src: v3.thumbnails.webp.src,
        type: "image/webp",
        size: v3.thumbnails.webp.size,
      },
      {
        src: v3.thumbnails.jpg.src,
        type: "image/jpeg",
        size: v3.thumbnails.jpg.size,
      },
    ],
    season: v3.season,
    episode: v3.episode,
    title: v3.title,
    description: v3.description,
    date: v3.date,
    duration: v3.duration,
  };
}

export function v3tov3(v3: IMetadataV3): IMetadataV3 {
  return v3;
}
