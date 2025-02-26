import htmlRoot from "../html/root";
import root from "../syntax/root";
import { ConverterConfig, coreConfig } from "./config";
import { HTMLConverter } from "./converter";

export const mergeConfig = (configs: ConverterConfig[]): ConverterConfig => {
  const result: ConverterConfig = {
    scope: {},
    enumeration: {},
    display: {},
    markup: {},
  };

  configs.forEach(config => {
    for (let spec in config.scope) {
      if (result.scope[spec]) {
        continue;
      }
      result.scope[spec] = config.scope[spec];
    }

    for (let spec in config.enumeration) {
      if (result.enumeration[spec]) {
        continue;
      }
      result.enumeration[spec] = config.enumeration[spec];
    }

    for (let spec in config.display) {
      if (result.display[spec]) {
        continue;
      }
      result.display[spec] = config.display[spec];
    }

    for (let spec in config.markup) {
      if (result.markup[spec]) {
        continue;
      }
      result.markup[spec] = config.markup[spec];
    }
  });

  return result;
};

function htmlCompiler (configs?: ConverterConfig[]): HTMLConverter {
  const compilerConfig: ConverterConfig = configs !== undefined ? mergeConfig(configs) : coreConfig;

  return (input: string) => {
    const parser = root({
      scope: [...Object.keys(compilerConfig.scope)],
      enumeration: [...Object.keys(compilerConfig.enumeration)],
      display: [...Object.keys(compilerConfig.display)],
      markup: [...Object.keys(compilerConfig.markup)],
    });
    const generator = htmlRoot(compilerConfig);
    
    const rootNode = parser(input);
    if (rootNode.status === "fail") {
      return {
        status: "fail",
        message: rootNode.message,
      };
    }

    const output = generator(rootNode.data);
    return output;
  };
}

export default htmlCompiler;