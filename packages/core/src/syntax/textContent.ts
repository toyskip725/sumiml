import { Parser } from "../parser/parser";
import character from "../parser/character";
import newline from "./newline";

export type TextContentNode = {
  type: "text",
  content: string;
};

const textContent: Parser<TextContentNode> = (input: string) => {
  const tagStartPoint = character("<");

  const data: string[] = [];
  let rest: string = input;
  while(true) {
    if (rest === "") {
      break;
    }

    const isNewline = newline(rest);
    const istagStartPoint = tagStartPoint(rest);

    if (isNewline.status === "success" || istagStartPoint.status === "success") {
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

export default textContent;