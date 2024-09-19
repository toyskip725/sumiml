import { Parser } from "./parser";

function str(targetStr: string): Parser<string> {
  const target = [...targetStr];

  return (input: string) => {
    const inputArray = [...input];
    if (inputArray.length < target.length) {
      return {
        status: "fail",
      };
    }

    const result = input.substring(0, target.length) === targetStr;
    if (!result) {
      return {
        status: "fail",
      };
    }

    return {
      status: "success",
      data: targetStr,
      rest: input.slice(target.length),
    };
  };
}

export default str;