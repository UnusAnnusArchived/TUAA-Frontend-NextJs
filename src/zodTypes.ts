import { z } from "zod";
import { zu } from "zod_utilz";

const getFromErrorMap = (issue: z.ZodIssue) => {
  errorMap(issue, { data: undefined, defaultError: "" });
};

// https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md#zodissuecode
const errorMap = zu.makeErrorMap({
  invalid_type: ({ expected, received }) => JSON.stringify([`invalid_type`, expected, received]),
  unrecognized_keys: ({ keys }) => JSON.stringify(["unrecognized_keys", keys.join(", ")]),
  invalid_union: ({ unionErrors }) =>
    JSON.stringify([
      "invalid_union",
      unionErrors.map((err) => err.errors.map((issue) => getFromErrorMap(issue)).join(", ")).join(", "),
    ]),
  invalid_enum_value: ({ options }) => JSON.stringify(["invalid_enum_value", options.join(", ")]),
  invalid_arguments: ({ argumentsError }) =>
    JSON.stringify(["invalid_arguments", argumentsError.errors.map((err) => getFromErrorMap(err)).join(", ")]),
  invalid_return_type: ({ returnTypeError }) =>
    JSON.stringify(["invalid_arguments", returnTypeError.errors.map((err) => getFromErrorMap(err)).join(", ")]),
  invalid_string: ({ validation }) => JSON.stringify(["invalid_string", validation]),
  too_small: ({ type, minimum }) => JSON.stringify(["too_small", type, minimum]),
  too_big: ({ type, maximum }) => JSON.stringify(["too_big", type, maximum]),
  not_multiple_of: ({ multipleOf }) => JSON.stringify(["not_multiple_of", multipleOf]),
  invalid_literal: ({ expected, received }) => JSON.stringify(["invalid_literal", expected, received]),
  invalid_date: JSON.stringify(["invalid_date"]),
  invalid_intersection_types: JSON.stringify(["invalid_intersection_types"]),
  invalid_union_discriminator: JSON.stringify(["invalid_union_discriminator"]),
  not_finite: JSON.stringify(["not_finite"]),
  required: JSON.stringify(["required"]),
});

export const DirectResolution = z.object(
  {
    src: z.string({ errorMap }).url(),
    width: z.number({ errorMap }).gt(0),
  },
  { errorMap }
);

export const DirectSource = z.object(
  {
    type: z.literal("direct", { errorMap }),
    name: z.string({ errorMap }),
    id: z.string({ errorMap }),
    resolutions: z.array(DirectResolution, { errorMap }),
  },
  { errorMap }
);

export const YouTubeSource = z.object(
  {
    type: z.literal("youtube", { errorMap }),
    youtubeId: z.string({ errorMap }),
  },
  { errorMap }
);

export const Source = z.union([DirectSource, YouTubeSource], { errorMap });

export const Metadata = z.object(
  {
    _metadataVersion: z.literal(3, {
      errorMap,
    }),
    externalSources: z.array(Source, { errorMap }).optional(),
    uaid: z.string({ errorMap }).regex(/^s\d{2}.e\d{3}$/),
    season: z
      .number({
        errorMap,
      })
      .gte(0),
    episode: z
      .number({
        errorMap,
      })
      .gt(0),
    title: z.string({
      errorMap,
    }),
    description: z.string({
      errorMap,
    }),
    releaseDate: z
      .number({
        errorMap,
      })
      .gte(0),
    isLast: z.boolean({ errorMap }).optional(),
  },
  { errorMap }
);

export type IMetadata = z.infer<typeof Metadata>;

export type IDirectResolution = z.infer<typeof DirectResolution>;

export type IDirectSource = z.infer<typeof DirectSource>;

export type IYouTubeSource = z.infer<typeof YouTubeSource>;
