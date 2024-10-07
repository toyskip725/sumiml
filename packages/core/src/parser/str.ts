import { Parser } from "./parser";

function str(targetStr: string): Parser<string> {
  const target = [...targetStr];

  return (input: string) => {
    const inputArray = [...input];
    if (inputArray.length < target.length) {
      return {
        status: "fail",
        message: `[str] match failed: ${targetStr}`,
      };
    }

    const result = input.substring(0, target.length) === targetStr;
    if (!result) {
      return {
        status: "fail",
        message: `[str] match failed: ${targetStr}`,
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