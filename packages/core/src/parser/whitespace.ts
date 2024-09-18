import { Parser } from "./parser";

function whitespace(): Parser<null> {
  return (input: string) => {
    return {
      status: "success",
      data: null,
      rest: input.trimStart(),
    };
  };
}

export default whitespace;