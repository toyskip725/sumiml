import { HTMLGenerator } from "../generator/generator";
import { DisplayNode } from "../syntax/display";

const htmlMath: HTMLGenerator<DisplayNode> = (node: DisplayNode) => {
  return {
    status: "success",
    meta: {},
    html: `<div class="math-display">\$\$${node.content}\$\$</div>`,
  };
};

export default htmlMath;