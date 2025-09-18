import { ParsedQs } from "qs";
import { BadRequestError } from "./custom-errors";

export const getQueryParamAsNumber = (
  param: string | ParsedQs | (string | ParsedQs)[] | undefined,
  defaultValue: number
): number => {
  if (typeof param === "string" && param) {
    const parsed = parseInt(param);
    if (isNaN(parsed)) {
      throw new BadRequestError("Please send a valid value as query param");
    }

    return parsed;
  }

  return defaultValue;
};
