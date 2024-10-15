import { HTMLGenerator } from "@sumiml/core/src/generator/generator";
import { EnumerationNode } from "@sumiml/core/src/syntax/enumeration";
import { MarkupNode } from "@sumiml/core/src/syntax/markup";
import htmlBibliographyItem from "./bibliographyitem";

function htmlBibliography(markup: HTMLGenerator<MarkupNode>): HTMLGenerator<EnumerationNode> {
  return (node: EnumerationNode) => {
    const htmlOutput = node.children.map((element, index) => htmlBibliographyItem(index + 1, markup)(element));
    const success = htmlOutput.filter(output => output.status === "success");
    const fail = htmlOutput.filter(output => output.status === "fail");

    if(fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      };
    }

    const html = `<div class="bibliography"><p class="bibliography-heading">参考文献</p><ul class="bibliography-list">${success.map(output => output.html).join("")}</ul></div>`;

    return {
      status: "success",
      meta: {},
      html: html,
    };
  };
}

export default htmlBibliography;