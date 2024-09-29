import { HTMLGenerator } from "../generator/generator";
import { DirectiveNode } from "../syntax/directive";

const htmlDirective: HTMLGenerator<DirectiveNode> = (node: DirectiveNode) => {
  return {
    status: "success",
    meta: {
      version: node.version,
    },
    html: "",
  };
};

export default htmlDirective;