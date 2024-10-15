import { Parser } from "../parser/parser";
import many from "../parser/many";
import or from "../parser/or";
import str from "../parser/str";
import markup, { MarkupNode } from "./markup";
import { ParserConfig } from "./parserConfig";
import textContent, { TextContentNode } from "./textContent";
import map from "../parser/map";
import list, { ListNode } from "./list";

export type ListItemContentNode = TextContentNode | MarkupNode | ListNode;
export type ListItemNode = {
  type: "listitem",
  content: Array<ListItemContentNode>;
};

const listItem = (specs?: ParserConfig): Parser<ListItemNode> => {
  return (input: string) => {
    // start
    const listItemStartPoint = str("</> ");
    const startPoint = listItemStartPoint(input.trimStart());
    if (startPoint.status === "fail") {
      return startPoint;
    }

    // content
    const listItemContent = many(or<ListItemContentNode>([
      map(textContent, (output) => {
        return {
          type: "text",
          content: output.content.replace(/(\r\n|\r|\n)\s*/g, ""),
        } as TextContentNode;
      }),
      markup(undefined, specs),
      list(specs),
    ]), true);
    const content = listItemContent(startPoint.rest);
    if (content.status === "fail") {
      return content;
    }

    return {
      status: "success",
      data: {
        type: "listitem",
        content: content.data,
      },
      rest: content.rest,
    };
  };
};

export default listItem;