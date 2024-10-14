import { HTMLGenerator } from "../generator/generator";
import { ListItemNode } from "../syntax/listItem";
import { MarkupNode } from "../syntax/markup";
import htmlList from "./list";
import htmlMarkup from "./markup";
import htmlTextContent from "./textContent";


function htmlListItem(generators: Record<string, HTMLGenerator<MarkupNode>>): HTMLGenerator<ListItemNode> {
  const markup = htmlMarkup(generators);
  const list = htmlList(generators);

  return (node: ListItemNode) => {
    const htmlOutput = node.content.map(element => {
      switch (element.type) {
        case "text": 
          return htmlTextContent(element);
        case "markup":
          return markup(element);
        case "list":
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