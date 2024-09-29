import { HTMLGenerator } from "../generator/generator";
import { MarkupNode } from "../syntax/markup";

const htmlLink: HTMLGenerator<MarkupNode> = (node: MarkupNode) => {
  if (node.attributes.href === undefined) {
    return {
      status: "fail",
      message: "cannot find \"href\" attribute in <Link>",
    };
  }

  return {
    status: "success",
    meta: {},
    html: `<a href="${node.attributes.href}">${node.content}</a>`,
  };
};

export default htmlLink;