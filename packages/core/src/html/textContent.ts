import { HTMLGenerator } from "../generator/generator";
import { TextContentNode } from "../syntax/textContent";

const htmlTextContent: HTMLGenerator<TextContentNode> = (node: TextContentNode) => {
  return {
    status: "success",
    meta: {},
    html: `${node.content}`,
  };
};

export default htmlTextContent;