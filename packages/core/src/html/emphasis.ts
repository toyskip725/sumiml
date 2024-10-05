import { HTMLGenerator } from "../generator/generator";
import { MarkupNode } from "../syntax/markup";

const htmlEmphasis: HTMLGenerator<MarkupNode> = (node: MarkupNode) => {
  return {
    status: "success",
    meta: {},
    html: `<em>${node.content}</em>`,
  };
};

export default htmlEmphasis;