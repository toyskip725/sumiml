import { Parser } from "../parser/parser";
import character from "../parser/character";
import { TextContentNode } from "./textContent";

const rawText: Parser<TextContentNode> = (input: string) => {
  const tagStartPoint = character("<");

  const data: string[] = [];
  let rest: string = input;
  while(true) {
    if (rest === "") {
      break;
    }

    const istagStartPoint = tagStartPoint(rest);

    if (istagStartPoint.status === "success") {
      break;
    }

    data.push(rest.slice(0, 1));
    rest = rest.slice(1);
  }

  if(data.length === 0) {
    return {
      status: "fail",
    };
  }

  return {
    status: "success",
    data: {
      type: "text",
      content: data.join(""),
    },
    rest: rest,
  };
};

export default rawText;