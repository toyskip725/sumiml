import { HTMLGeneratorFactory, HTMLReducerGenerator } from "../generator/generator";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";
import { classifyNodes } from "./scope";

const htmlSubsection: HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>> = (
  generator: HTMLReducerGenerator<ScopeContentNode>
) => {
  return (node: ScopeNode) => {
    if (node.attributes.title === undefined) {
      return {
        status: "fail",
        message: "cannot find \"title\" attribute in <Subsection>",
      };
    }

    const includesInvalidChild = node.children
      .filter(child => child.type === "scope")
      .filter(child => child.tagname === "Section")
      .length !== 0;
    if (includesInvalidChild) {
      return {
        status: "fail",
        message: "<Subsection> cannot include <Section>",
      };
    }

    const htmlOutput = classifyNodes(node.children).map(nodes => generator(nodes));
    const success = htmlOutput.filter(output => output.status === "success");
    const fail = htmlOutput.filter(output => output.status === "fail");

    if(fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      };
    }
    
    return {
      status: "success",
      meta: {},
      html: `<h2 class="subsection-heading">${node.attributes.title}</h2><div>${success.map(output => output.html).join("")}</div>`,
    };
  };
};

export default htmlSubsection;