import { ConverterConfig } from "@sumiml/core/src/converter/config";
import htmlBibliography from "../html/bibliography";

export const utilConfig: ConverterConfig = {
  scope: {},
  enumeration: {
    "Bibliography": htmlBibliography,
  },
  display: {},
  markup: {},
} as const;