import { Parser } from "../parser/parser";
import { TextContentNode } from "./textContent";
import { formatErrorPosition } from "../util/format";

const rawText: Parser<TextContentNode> = (input: string) => {
  let index: number = 0;
  let rest: string = input;
  while(true) {
    if (rest === "") {
      break;
    }

    if (rest.startsWith("<")) {
      break;
    }

    index++;
    rest = rest.slice(1);
  }

  if(index === 0) {
    return {
      status: "fail",
      message: `[rawtext] there is no content to match: ${formatErrorPosition(rest)}`,
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

export default rawText;