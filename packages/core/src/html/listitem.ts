import { HTMLGenerator } from "../generator/generator";
import { EnumerationItemNode } from "../syntax/enumerationitem";
import { MarkupNode } from "../syntax/markup";
import htmlList from "./list";
import htmlTextContent from "./textContent";


function htmlListItem(markup: HTMLGenerator<MarkupNode>): HTMLGenerator<EnumerationItemNode> {
  const list = htmlList(markup);

  return (node: EnumerationItemNode) => {
    const htmlOutput = node.content.map(element => {
      switch (element.type) {
        case "text": 
          return htmlTextContent(element);
        case "markup":
          return markup(element);
        case "enumeration":
          return list(element);
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
      html: `<li>${success.map(output => output.html).join("")}</li>`
    };
  };
};

export default htmlListItem;