import many from "../parser/many";
import { type Parser } from "../parser/parser";
import str from "../parser/str";
import { formatErrorPosition } from "../util/format";
import listItem, { type ListItemNode } from "./listItem";
import openingTag from "./openingTag";
import { type ParserConfig } from "./parserConfig";

export type ListNode = {
  type: "list";
  listtype: "ordered" | "itemized";
  children: Array<ListItemNode>;
};

const listContent = (specs?: ParserConfig) => many(listItem(specs));

function list(specs?: ParserConfig): Parser<ListNode> {
  return (input: string) => {
    const openTag = openingTag(input);
    if(openTag.status === "fail") {
      return openTag;
    }

    if (openTag.data.tagname !== "List") {
      return {
        status: "fail",
        message: `[list] the tagname is not "List"`,
      };
    }

    if (openTag.data.attributes.type !== "ordered" && openTag.data.attributes.type !== "itemized") {
      return {
        status: "fail",
        message: `[list] list requires attribute "type" to be "ordered" or "itemized": ${formatErrorPosition(input)}`,
      };
    }

    const content = listContent(specs)(openTag.rest);
    if(content.status === "fail") {
      return content;
    }

    const closingTag = str(`</List>`)(content.rest.trimStart());
    if (closingTag.status === "fail") {
      return closingTag;
    }

    return {
      status: "success",
      data: {
        type: "list",
        listtype: openTag.data.attributes.type,
        children: content.data,
      },
      rest: closingTag.rest,
    };
  };
};

export default list;