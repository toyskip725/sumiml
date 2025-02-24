import { Parser } from "../parser/parser";
import newline from "./newline";
import { formatErrorPosition } from "../util/format";

export type TextContentNode = {
  type: "text",
  content: string;
};

const textContent: Parser<TextContentNode> = (input: string) => {
  let index: number = 0;
  let rest: string = input;
  while(true) {
    if (rest === "") {
      break;
    }

    const isNewline = newline(rest);

    if (isNewline.status === "success" || rest.startsWith("<")) {
      break;
    }

    index++;
    rest = rest.slice(1);
  }

  if(index === 0) {
    return {
      status: "fail",
      message: `[textcontent] there is no content to match: ${formatErrorPosition(rest)}`,
    };
  }

  return {
    status: "success",
    data: {
      type: "text",
      content: input.slice(0, index),
    },
    rest: rest,
  };
};

export default textContent;