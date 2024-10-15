import { HTMLGenerator, HTMLGeneratorFactory } from "../generator/generator";
import { EnumerationNode } from "../syntax/enumeration";
import { MarkupNode } from "../syntax/markup";
import htmlEnumerationItem from "./enumerationitem";

function htmlEnumeration(
  enumerationGenerators: Record<string, HTMLGeneratorFactory<EnumerationNode, HTMLGenerator<MarkupNode>>>,
  markup: HTMLGenerator<MarkupNode>
): HTMLGenerator<EnumerationNode> {
  return (node: EnumerationNode) => {
    for (let keyword in enumerationGenerators) {
      if (node.tagname === keyword) {
        return enumerationGenerators[keyword](markup)(node);
      }
    }

    const htmlOutput = node.children.map(element => htmlEnumerationItem(enumerationGenerators, markup)(element));
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
      html: `<ul>${success.map(output => output.html).join("")}</ul>`,
    };
  };
}

export default htmlEnumeration;