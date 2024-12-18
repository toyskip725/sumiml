export type HTMLOutput = {
  html: string;
};

type NodeType = {
  type: string;
};
type GeneratorSuccessOutput<T extends Record<string, string>> = T & {
  status: "success";
  meta: Record<string, unknown>;
};
type GeneratorFailOutput = {
  status: "fail";
  message: string;
};

export type GeneratorOutput<T extends Record<string, string>> = GeneratorSuccessOutput<T> | GeneratorFailOutput;
export type HTMLGenerator<T extends NodeType> = (input: T) => GeneratorOutput<HTMLOutput>;

export type HTMLReducerGenerator<T extends NodeType> = (nodes: T[]) => GeneratorOutput<HTMLOutput>;

export type HTMLGeneratorFactory<T extends NodeType, U> = (resource: U) => HTMLGenerator<T>;