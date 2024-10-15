import { GeneratorOutput, HTMLGenerator, HTMLOutput } from "@sumiml/core/src/generator/generator";
import htmlTextContent from "@sumiml/core/src/html/textContent";
import { EnumerationItemNode } from "@sumiml/core/src/syntax/enumerationitem";
import { MarkupNode } from "@sumiml/core/src/syntax/markup";

function htmlBibliographyItem(index: number, markup: HTMLGenerator<MarkupNode>): HTMLGenerator<EnumerationItemNode> {
  return (node: EnumerationItemNode) => {
    const htmlOutput = node.content.map(element => {
      switch (element.type) {
        case "text": 
          return htmlTextContent(element);
        case "markup":
          return markup(element);
        case "enumeration":
          return {
            status: "fail",
            message: "[bibliography] each bibliography item cannot include enumeration element",
          } as GeneratorOutput<HTMLOutput>;
      }
    });
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
      html: `<li>[${index}] ${success.map(output => output.html).join("")}</li>`
    };
  };
};

export default htmlBibliographyItem;