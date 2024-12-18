import { Parser } from "./parser";

function many<T extends unknown>(target: Parser<T>, trimStart: boolean = false): Parser<Array<T>> {
  return (input: string) => {
    const result: T[] = [];
    let rest: string = input;
    
    while(true) {
      const output = target(rest);
      if (output.status === "fail") {
        break;
      }

      result.push(output.data);
      rest = trimStart ? output.rest.trimStart() : output.rest;
    }

    return {
      status: "success",
      data: result,
      rest: rest,
    };
  };
}

export default many;