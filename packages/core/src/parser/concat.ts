import { Parser } from "./parser";

function concat<T extends unknown>(parsers: Array<Parser<T>>): Parser<Array<T>> {
  return (input: string) => {
    const data: T[] = [];
    let rest: string = input;

    for(let parser of parsers) {
      const output = parser(rest);
      if (output.status === "fail") {
        return output;
      }

      data.push(output.data);
      rest = output.rest;
    }

    return {
      status: "success",
      data: data,
      rest: rest,
    };
  };
}

export default concat;