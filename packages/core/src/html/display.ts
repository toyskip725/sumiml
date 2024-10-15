import { HTMLGenerator } from "../generator/generator";
import { DisplayNode } from "../syntax/display";

function htmlDisplay(generators: Record<string, HTMLGenerator<DisplayNode>>): HTMLGenerator<DisplayNode> {
  return (node: DisplayNode) => {
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

export default htmlDisplay;