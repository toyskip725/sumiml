import { Parser } from "../parser/parser";
import regexp from "../parser/regexp";
import str from "../parser/str";
import openingTag from "./openingTag";

export type MarkupNode = {
  tagname: string;
  attributes: Record<string, string>;
  content: string;
};

function markup(targetTag?: string): Parser<MarkupNode> {
  return (input: string) => {
    const openTag = openingTag(input);
    if(openTag.status === "fail") {
      return openTag;
    }
    if (targetTag !== undefined && openTag.data.tagname !== targetTag) {
      return {
        status: "fail",
      };
    }

    const content = regexp(/[^<]*/g)(openTag.rest);
    if(content.status === "fail") {
      return content;
    }

    const closingTag = str(`</${openTag.data.tagname}>`)(content.rest);
    if (closingTag.status === "fail") {
      return closingTag;
    }

    return {
      status: "success",
      data: {...openTag.data, content: content.data},
      rest: closingTag.rest,
    };
  };
}

export default markup;