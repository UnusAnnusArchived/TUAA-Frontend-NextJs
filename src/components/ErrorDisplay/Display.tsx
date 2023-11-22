"use client";

import { useClientTranslation } from "@/hooks/useTranslation";
import { IError } from "@/types";
import { z } from "zod";
import { ErrorCode } from "zod_utilz";
import T from "../T";
import { useRecoilState } from "recoil";

interface IProps {
  errors: Array<IError<string | z.typeToFlattenedError<any>>>;
}

const ErrorDisplay: React.FC<IProps> = ({ errors }) => {
  const [t] = useClientTranslation(useRecoilState);

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
                                  translated = t.zodErrors.invalidType
                                    .replace("{expectedValue}", errArr[1])
                                    .replace("{receivedValue}", errArr[2]);
                                  break;
                                }
                                case "unrecognized_keys": {
                                  translated = t.zodErrors.unrecognizedKeys.replace("{keysList}", errArr[1]);
                                  break;
                                }
                                case "invalid_union": {
                                  translated = t.zodErrors.invalidUnion.replace("{unionErrorsList}", errArr[1]);
                                  break;
                                }
                                case "invalid_enum_value": {
                                  translated = t.zodErrors.invalidEnumValue.replace("{optionsList}", errArr[1]);
                                  break;
                                }
                                case "invalid_arguments": {
                                  translated = t.zodErrors.invalidArguments.replace("{argumentsErrorList}", errArr[1]);
                                  break;
                                }
                                case "invalid_return_type": {
                                  translated = t.zodErrors.invalidReturnType.replace("{returnTypeErrors}", errArr[1]);
                                  break;
                                }
                                case "invalid_string": {
                                  translated = t.zodErrors.invalidString.replace("{validatorType}", errArr[1]);
                                  break;
                                }
                                case "too_small": {
                                  translated = t.zodErrors.tooSmall
                                    .replace("{type}", errArr[1])
                                    .replace("{minimum}", errArr[2]);
                                  break;
                                }
                                case "too_big": {
                                  translated = t.zodErrors.tooBig
                                    .replace("{type}", errArr[1])
                                    .replace("{maximum}", errArr[2]);
                                  break;
                                }
                                case "not_multiple_of": {
                                  translated = t.zodErrors.notMultipleOf.replace("{multipleOf}", errArr[1]);
                                  break;
                                }
                                case "invalid_literal": {
                                  translated = t.zodErrors.invalidLiteral
                                    .replace("{expected}", errArr[1])
                                    .replace("{received}", errArr[2]);
                                  break;
                                }
                                case "invalid_date": {
                                  translated = t.zodErrors.invalidDate;
                                  break;
                                }
                                case "invalid_intersection_types": {
                                  translated = t.zodErrors.invalidIntersectionTypes;
                                  break;
                                }
                                case "invalid_union_discriminator": {
                                  translated = t.zodErrors.invalidUnionDiscriminator;
                                  break;
                                }
                                case "not_finite": {
                                  translated = t.zodErrors.notFinite;
                                  break;
                                }
                                case "required": {
                                  translated = t.zodErrors.required;
                                  break;
                                }
                              }

                              return (
                                <li>
                                  <T>{translated}</T>
                                </li>
                              );
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
