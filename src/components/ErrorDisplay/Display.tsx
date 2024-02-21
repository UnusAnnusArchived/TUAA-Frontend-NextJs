"use client";

import { IError } from "@/types";
import { z } from "zod";
import { ErrorCode } from "zod_utilz";
import { useTranslate } from "@tolgee/react";
import { useRecoilState } from "recoil";

interface IProps {
  errors: Array<IError<string | z.typeToFlattenedError<any>>>;
}

const ErrorDisplay: React.FC<IProps> = ({ errors }) => {
  const { t } = useTranslate();

  return (
    <>
      <ul>
        {errors.map((error, i) => {
          if (typeof error.error === "string") {
            return (
              <>
                <li>
                  <code>{error.location}</code>
                </li>
                <ul>
                  <li>{error.error}</li>
                </ul>
              </>
            );
          } else {
            const fieldErrorNames = Object.getOwnPropertyNames(error.error.fieldErrors);

            return (
              <>
                <li>
                  <code>{error.location}</code>
                </li>
                <ul>
                  {fieldErrorNames.map((name) => {
                    const fieldError = (error.error as z.typeToFlattenedError<any>).fieldErrors[name];
                    return (
                      <>
                        <li>
                          <code>{name}</code>:
                        </li>
                        <ul>
                          {fieldError?.map?.((err) => {
                            try {
                              let translated = "";

                              const errArr = JSON.parse(err) as [ErrorCode, ...any];

                              switch (errArr[0]) {
                                case "invalid_type": {
                                  translated = t({
                                    key: "zodErrors.invalidType",
                                    params: { expectedValue: errArr[1], receivedValue: errArr[2] },
                                  });
                                  break;
                                }
                                case "unrecognized_keys": {
                                  translated = t({
                                    key: "zodErrors.unrecognizedKeys",
                                    params: { keysList: errArr[1] },
                                  });
                                  break;
                                }
                                case "invalid_union": {
                                  translated = t({
                                    key: "zodErrors.invalidUnion",
                                    params: { unionErrorsList: errArr[1] },
                                  });
                                  break;
                                }
                                case "invalid_enum_value": {
                                  translated = t({
                                    key: "zodErrors.invalidEnumValue",
                                    params: { optionsList: errArr[1] },
                                  });
                                  break;
                                }
                                case "invalid_arguments": {
                                  translated = t({
                                    key: "zodErrors.invalidArguments",
                                    params: { argumentsErrorList: errArr[1] },
                                  });
                                  break;
                                }
                                case "invalid_return_type": {
                                  translated = t({
                                    key: "zodErrors.invalidReturnType",
                                    params: { returnTypeErrors: errArr[1] },
                                  });
                                  break;
                                }
                                case "invalid_string": {
                                  translated = t({
                                    key: "zodErrors.invalidString",
                                    params: { validatorType: errArr[1] },
                                  });
                                  break;
                                }
                                case "too_small": {
                                  translated = t({
                                    key: "zodErrors.tooSmall",
                                    params: { type: errArr[1], minimum: errArr[2] },
                                  });
                                  break;
                                }
                                case "too_big": {
                                  translated = t({
                                    key: "zodErrors.tooBig",
                                    params: { type: errArr[1], maximum: errArr[2] },
                                  });
                                  break;
                                }
                                case "not_multiple_of": {
                                  translated = t({ key: "zodErrors.notMultipleOf", params: { multipleOf: errArr[1] } });
                                  break;
                                }
                                case "invalid_literal": {
                                  translated = t({
                                    key: "zodErrors.invalidLiteral",
                                    params: { expected: errArr[1], received: errArr[2] },
                                  });
                                  break;
                                }
                                case "invalid_date": {
                                  translated = t("zodErrors.invalidDate");
                                  break;
                                }
                                case "invalid_intersection_types": {
                                  translated = t("zodErrors.invalidIntersectionTypes");
                                  break;
                                }
                                case "invalid_union_discriminator": {
                                  translated = t("zodErrors.invalidUnionDiscriminator");
                                  break;
                                }
                                case "not_finite": {
                                  translated = t("zodErrors.notFinite");
                                  break;
                                }
                                case "required": {
                                  translated = t("zodErrors.required");
                                  break;
                                }
                              }

                              return <li suppressHydrationWarning>{translated}</li>;
                            } catch (err: any) {
                              return <li>Error while parsing error: {err.toString()}</li>;
                            }
                          })}
                        </ul>
                      </>
                    );
                  })}
                </ul>
              </>
            );
          }
        })}
      </ul>
    </>
  );
};

export default ErrorDisplay;
