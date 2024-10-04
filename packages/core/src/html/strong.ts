import { HTMLGenerator } from "../generator/generator";
import { MarkupNode } from "../syntax/markup";

const htmlStrong: HTMLGenerator<MarkupNode> = (node: MarkupNode) => {
  return {
    status: "success",
    meta: {},
    html: `<strong>${node.content}</strong>`,
  };
};

export default htmlStrong;