import { HTMLGeneratorFactory, HTMLReducerGenerator } from "@sumiml/core/src/generator/generator";
import { classifyNodes } from "@sumiml/core/src/html/scope";
import { ScopeContentNode, ScopeNode } from "@sumiml/core/src/syntax/scope";
import { getIdHash } from "../util/idhash";

function htmlTheoremBase(type: string) {
  const theorem: HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>> = (
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
        ? `<p id="${getIdHash(node.attributes.name)}" class="theorem-title">
            <span class="math-numbering">${type}</span><span> (${node.attributes.name})</span>
          </p>`
        : `<p class="theorem-title">
            <span class="math-numbering">${type}</span>
          </p>`;
      const contentHtml = `<div class="theorem-content">${success.map(output => output.html).join("")}</div>`;
      
      return {
        status: "success",
        meta: {},
        html: `<div class="theorem-wrapper">${headingHtml}${contentHtml}</div>`,
      };
    };
  };

  return theorem;
}

export default htmlTheoremBase;