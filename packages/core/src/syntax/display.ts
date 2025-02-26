import { Parser } from "../parser/parser";
import str from "../parser/str";
import { formatErrorPosition } from "../util/format";
import openingTag from "./openingTag";
import rawText from "./rawText";
import { ParserConfig } from "./parserConfig";

export type DisplayNode = {
  type: "display";
  tagname: string;
  attributes: Record<string, string>;
  content: string;
};

function display(targetTag?: string, specs?: ParserConfig): Parser<DisplayNode> {
  return (input: string) => {
    const openTag = openingTag(input);
    if(openTag.status === "fail") {
      return openTag;
    }
    if (targetTag !== undefined && openTag.data.tagname !== targetTag) {
      return {
        status: "fail",
        message: `[display] the tagname does not match target: ${formatErrorPosition(input)}`,
      };
    }

    if (specs !== undefined 
      && (specs.markup.includes(openTag.data.tagname) || specs.scope.includes(openTag.data.tagname))) {
      return {
        status: "fail",
        message: `[display] the tag should be parsed as markup or scope, but is parsed as display: ${formatErrorPosition(input)}`,
      };
    }

    const content = rawText(openTag.rest);
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
        type: "display",
        tagname: openTag.data.tagname,
        attributes: openTag.data.attributes,
        content: content.data.content,
      },
      rest: closingTag.rest,
    };
  };
}

export default display;