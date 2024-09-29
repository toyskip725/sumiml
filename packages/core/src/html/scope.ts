import { HTMLGenerator, HTMLGeneratorFactory } from "../generator/generator";
import { MarkupNode } from "../syntax/markup";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";
import htmlMarkup from "./markup";
import htmlTextContent from "./textContent";

function htmlScope(
  scopeGenerators: Record<string, HTMLGeneratorFactory<ScopeContentNode, ScopeNode>>, 
  markupGenerators: Record<string, HTMLGenerator<MarkupNode>>
): HTMLGenerator<ScopeNode> {
  const htmlScopeContent: HTMLGenerator<ScopeContentNode> = (node: ScopeContentNode) => {
    switch(node.type) {
      case "newline":
        throw new Error("not implemented");
      case "text":
        return htmlTextContent(node);
      case "markup":
        return htmlMarkup(markupGenerators)(node);
      case "scope":
        return htmlScope(scopeGenerators, markupGenerators)(node);
    }
  };

  return (node: ScopeNode) => {
    for (let keyword in scopeGenerators) {
      if (node.tagname === keyword) {
        return scopeGenerators[keyword](htmlScopeContent)(node);
      }
    }

    const childrenHtmlOutput = node.children.map(child => {
      return htmlScopeContent(child);
    });
    const success = childrenHtmlOutput.filter(output => output.status === "success");
    const fail = childrenHtmlOutput.filter(output => output.status === "fail");

    if(fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      };
    }

    return {
      status: "success",
      meta: {},
      html: `<div class="${node.tagname}">${success.map(output => output.html).join("")}</div>`,
    };
  };
}

export default htmlScope;