import many from "../parser/many";
import or from "../parser/or";
import { Parser } from "../parser/parser";
import str from "../parser/str";
import display, { DisplayNode } from "./display";
import markup, { MarkupNode } from "./markup";
import newline, { NewLineNode } from "./newline";
import openingTag from "./openingTag";
import { ParseTagSpecs } from "./specs";
import textContent, { TextContentNode } from "./textContent";

export type ScopeContentNode = NewLineNode | TextContentNode | MarkupNode | DisplayNode | ScopeNode;
export type ScopeNode = {
  type: "scope",
  tagname: string;
  attributes: Record<string, string>;
  children: Array<ScopeContentNode>;
};

const scopeContent = (specs?: ParseTagSpecs) => many(or<ScopeContentNode>([
  newline,
  textContent, 
  markup(undefined, specs),
  display(undefined, specs),
  scope(undefined, specs),
]));

function scope(targetTag?: string, specs?: ParseTagSpecs): Parser<ScopeNode> {

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

    const content = scopeContent(specs)(openTag.rest);
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
        type: "scope",
        tagname: openTag.data.tagname,
        attributes: openTag.data.attributes,
        children: content.data,
      },
      rest: closingTag.rest,
    };
  };
}

export default scope;