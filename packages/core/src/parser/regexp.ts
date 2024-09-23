import { Parser } from "./parser";

function regexp(exp: RegExp): Parser<string> {  
  return (input: string) => {
    const match = input.match(exp);
    if (match === null || match.length === 0) {
      return { status: "fail" };
    }

    return {
      status: "success",
      data: match[0],
      rest: input.slice(match[0].length),
    };
  };
}

export default regexp;