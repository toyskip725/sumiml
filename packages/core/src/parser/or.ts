import { Parser } from "./parser";

function or<T extends unknown>(parsers: Array<Parser<T>>): Parser<T> {
  return (input: string) => {
    for (let parser of parsers) {
      const output = parser(input);

      if (output.status === "success") {
        return output;
      }
    };

    return {
      status: "fail",
    };
  };
}

export default or;