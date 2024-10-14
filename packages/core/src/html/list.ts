import { HTMLGenerator } from "../generator/generator";
import { ListNode } from "../syntax/list";
import { MarkupNode } from "../syntax/markup";
import htmlListItem from "./listitem";

function htmlList(generators: Record<string, HTMLGenerator<MarkupNode>>):HTMLGenerator<ListNode> {

  return (node: ListNode) => {
    const htmlOutput = node.children.map(element => htmlListItem(generators)(element));
    const success = htmlOutput.filter(output => output.status === "success");
    const fail = htmlOutput.filter(output => output.status === "fail");

    if(fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      };
    }

    const html = node.listtype === "itemized"
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