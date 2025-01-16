import { HTMLGeneratorFactory, HTMLReducerGenerator } from "@sumiml/core/src/generator/generator";
import { classifyNodes } from "@sumiml/core/src/html/scope";
import { ScopeContentNode, ScopeNode } from "@sumiml/core/src/syntax/scope";
import { getRandomId } from "../util/idhash";

const htmlProof: HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>> = (
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

    const id = getRandomId();
    const buttonHtml = `<button id="${id}/button" class="proof-button" onclick="onClickProof('${id}')">証明</button>`;
    const contentHtml = `<div id="${id}/content" class="proof-content">${success.map(output => output.html).join("")}</div>`;
    
    return {
      status: "success",
      meta: {},
      html: `<div class="proof-wrapper">${buttonHtml}${contentHtml}</div>`,
    };
  };
};

export default htmlProof;