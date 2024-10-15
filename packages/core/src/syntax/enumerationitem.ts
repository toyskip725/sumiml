import many from "../parser/many";
import map from "../parser/map";
import or from "../parser/or";
import { Parser } from "../parser/parser";
import str from "../parser/str";
import enumeration, { EnumerationNode } from "./enumeration";
import markup, { MarkupNode } from "./markup";
import { ParserConfig } from "./parserConfig";
import textContent, { TextContentNode } from "./textContent";

export type EnumerationItemContentNode = TextContentNode | MarkupNode | EnumerationNode;
export type EnumerationItemNode = {
  type: "item",
  content: Array<EnumerationItemContentNode>;
};

const enumerationItem = (specs?: ParserConfig): Parser<EnumerationItemNode> => {
  return (input: string) => {
    // start
    const enumerationItemStartPoint = str("</> ");
    const startPoint = enumerationItemStartPoint(input.trimStart());
    if (startPoint.status === "fail") {
      return startPoint;
    }

    // content
    const enumerationItemContent = many(or<EnumerationItemContentNode>([
      map(textContent, (output) => {
        return {
          type: "text",
          content: output.content.replace(/(\r\n|\r|\n)\s*/g, ""),
        } as TextContentNode;
      }),
      markup(undefined, specs),
      enumeration(undefined, specs),
    ]), true);
    const content = enumerationItemContent(startPoint.rest);
    if (content.status === "fail") {
      return content;
    }

    return {
      status: "success",
      data: {
        type: "item",
        content: content.data,
      },
      rest: content.rest,
    };
  };
};

export default enumerationItem;