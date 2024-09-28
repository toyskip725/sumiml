import { Parser } from "../parser/parser";
import str from "../parser/str";
import openingTag from "./openingTag";
import textContent from "./textContent";

export type MarkupNode = {
  type: "markup",
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

    const content = textContent(openTag.rest);
    if(content.status === "fail") {
      return content;
    }

    const closingTag = str(`</${openTag.data.tagname}>`)(content.rest);
    if (closingTag.status === "fail") {
      return closingTag;
    }

    return {
      status: "success",
      data: {
        type: "markup",
        tagname: openTag.data.tagname,
        attributes: openTag.data.attributes,
        content: content.data.content
      },
      rest: closingTag.rest,
    };
  };
}

export default markup;