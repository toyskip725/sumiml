import { formatErrorPosition } from "../util/format";
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
      message: `[or] none of the parsers matched: ${formatErrorPosition(input)}`,
    };
  };
}

export default or;