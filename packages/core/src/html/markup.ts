import { HTMLGenerator } from "../generator/generator";
import { MarkupNode } from "../syntax/markup";

function htmlMarkup(generators: Record<string, HTMLGenerator<MarkupNode>>): HTMLGenerator<MarkupNode> {
  return (node: MarkupNode) => {
    for (let keyword in generators) {
      if (node.tagname === keyword) {
        return generators[keyword](node);
      }
    }

    return {
      status: "success",
      meta: {},
      html: `<div class="${node.tagname.toLowerCase()}">${node.content}</div>`,
    };
  };
}

export default htmlMarkup;