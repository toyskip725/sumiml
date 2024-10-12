import htmlCompiler from "./converter/htmlCompiler";
import preprocessor from "./converter/preprocessor";
import metadata from "./converter/metadata";
import {type ConverterType, coreConfig, coreScopeConfig, coreDisplayConfig, coreMarkupConfig } from "./converter/config";

// config
export { type ConverterType };
export const core = (type: ConverterType) => {
  return coreConfig;
};

export {
  htmlCompiler,
  preprocessor,
  metadata,
  coreScopeConfig,
  coreDisplayConfig,
  coreMarkupConfig,
};