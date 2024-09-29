import { HTMLGenerator, HTMLGeneratorFactory } from "../generator/generator";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";

const htmlSection: HTMLGeneratorFactory<ScopeContentNode, ScopeNode> = (generator: HTMLGenerator<ScopeContentNode>) => {
  return (node: ScopeNode) => {
    if (node.attributes.title === undefined) {
      return {
        status: "fail",
        message: "cannot find \"title\" attribute in <Section>",
      };
    }

    const childrenHtmlOutput = node.children.map(child => {
      return generator(child);
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
      html: `<h1>${node.attributes.title}</h1><div>${success.map(output => output.html).join("")}</div>`,
    };
  };
};

export default htmlSection;