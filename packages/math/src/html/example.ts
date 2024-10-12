import { HTMLGeneratorFactory, HTMLReducerGenerator } from "@sumiml/core/src/generator/generator";
import { classifyNodes } from "@sumiml/core/src/html/scope";
import { ScopeContentNode, ScopeNode } from "@sumiml/core/src/syntax/scope";
import { getIdHash } from "../util/idhash";

const htmlExample: HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>> = (
  generator: HTMLReducerGenerator<ScopeContentNode>
) => {
  return (node: ScopeNode) => {
    const htmlOutput = classifyNodes(node.children).map(nodes => generator(nodes));
    const success = htmlOutput.filter(output => output.status === "success");
    const fail = htmlOutput.filter(output => output.status === "fail");

    if(fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      };
    }

    const headingHtml = node.attributes["name"] 
      ? `<p id="${getIdHash(node.attributes.name)}" class="example-title">
          <span class="math-numbering">例</span><span> (${node.attributes.name})</span>
        </p>`
      : `<p class="example-title">
          <span class="math-numbering">例</span>
        </p>`;
    const contentHtml = `<div class="example-content">${success.map(output => output.html).join("")}</div>`;
    
    return {
      status: "success",
      meta: {},
      html: `<div class="example-wrapper">${headingHtml}${contentHtml}</div>`,
    };
  };
};

export default htmlExample;