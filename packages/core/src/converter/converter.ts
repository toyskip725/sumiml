import { GeneratorOutput, HTMLOutput } from "../generator/generator";

export type Converter<T extends Record<string, string>> = (innput: string) => GeneratorOutput<T>;
export type HTMLConverter = Converter<HTMLOutput>;