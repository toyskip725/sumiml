import { Parser } from "../parser/parser";
import str from "../parser/str";
import openingTag from "./openingTag";
import { ParseTagSpecs } from "./specs";
import textContent from "./textContent";

export type MarkupNode = {
  type: "markup",
  tagname: string;
  attributes: Record<string, string>;
  content: string;
};

function markup(targetTag?: string, specs?: ParseTagSpecs): Parser<MarkupNode> {
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

    if (specs !== undefined 
      && (specs.scope.includes(openTag.data.tagname) || specs.display.includes(openTag.data.tagname))) {
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