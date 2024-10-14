import { HTMLGenerator } from "../generator/generator";
import { EnumerationNode } from "../syntax/enumeration";
import { MarkupNode } from "../syntax/markup";
import htmlListItem from "./listitem";

function htmlList(markup: HTMLGenerator<MarkupNode>): HTMLGenerator<EnumerationNode> {
  return (node: EnumerationNode) => {
    if (node.attributes.type === undefined) {
      return {
        status: "fail",
        message: `[list] missing attribute "type"`,
      };
    }

    if (node.attributes.type !== "itemized" && node.attributes.type !== "ordered") {
      return {
        status: "fail",
        message: `[list] List requires the value of attribute "type" to be "itemized" or "ordered`,
      };
    }

    const htmlOutput = node.children.map(element => htmlListItem(markup)(element));
    const success = htmlOutput.filter(output => output.status === "success");
    const fail = htmlOutput.filter(output => output.status === "fail");

    if(fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      };
    }

    const html = node.attributes.type === "itemized"
      ? `<ul>${success.map(output => output.html).join("")}</ul>`
      : `<ol>${success.map(output => output.html).join("")}</ol>`;

    return {
      status: "success",
      meta: {},
      html: html,
    };
  };
}

export default htmlList;