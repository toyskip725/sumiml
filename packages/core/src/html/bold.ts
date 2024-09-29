import { HTMLGenerator } from "../generator/generator";
import { MarkupNode } from "../syntax/markup";

const htmlBold: HTMLGenerator<MarkupNode> = (node: MarkupNode) => {
  return {
    status: "success",
    meta: {},
    html: `<b>${node.content}</b>`,
  };
};

export default htmlBold;