import { ParseTagSpecs } from "./specs";
import openingTag from "./openingTag";
import many from "../parser/many";
import { formatErrorPosition } from "../util/format";
import str from "../parser/str";
import { Parser } from "../parser/parser";
import enumerationItem, { EnumerationItemNode } from "./enumerationitem";

export type EnumerationNode = {
  type: "enumeration";
  tagname: string;
  attributes: Record<string, string>;
  children: Array<EnumerationItemNode>;
};

const enumerationContent = (specs?: ParseTagSpecs) => many(enumerationItem(specs));

function enumeration(targetTag?: string, specs?: ParseTagSpecs): Parser<EnumerationNode> {
  return (input: string) => {
    const openTag = openingTag(input);
    if(openTag.status === "fail") {
      return openTag;
    }

    if (targetTag !== undefined && openTag.data.tagname !== targetTag) {
      return {
        status: "fail",
        message: `[enumeration] the tagname does not match target: ${formatErrorPosition(input)}`,
      };
    }

    const content = enumerationContent(specs)(openTag.rest);
    if(content.status === "fail") {
      return content;
    }

    const closingTag = str(`</${openTag.data.tagname}>`)(content.rest.trimStart());
    if (closingTag.status === "fail") {
      return closingTag;
    }

    return {
      status: "success",
      data: {
        type: "enumeration",
        tagname: openTag.data.tagname,
        attributes: openTag.data.attributes,
        children: content.data,
      },
      rest: closingTag.rest,
    };
  };
};

export default enumeration;