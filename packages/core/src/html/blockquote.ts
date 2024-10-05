import { HTMLGenerator } from "../generator/generator";
import { DisplayNode } from "../syntax/display";

const htmlBlockquote: HTMLGenerator<DisplayNode> = (node: DisplayNode) => {
  return {
    status: "success",
    meta: {},
    html: `<blockquote><p>${node.content}</p></blockquote>`,
  };
};

export default htmlBlockquote;