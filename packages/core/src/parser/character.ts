import { Parser } from "./parser";

function character(targetChar: string): Parser<string> {
  if (targetChar.length !== 1) {
    return (_input: string) => { return { result: "fail" }; };
  }
  
  return (input: string) => {
    if ([...input][0] !== targetChar) {
      return { result: "fail" };
    } 

    return {
      result: "success",
      data: targetChar,
      rest: input.slice(1),
    };
  };
}

export default character;