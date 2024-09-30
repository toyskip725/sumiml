import { HTMLGenerator, HTMLGeneratorFactory, HTMLReducerGenerator } from "../generator/generator";
import { MarkupNode } from "../syntax/markup";
import { RootNode } from "../syntax/root";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";
import htmlScope from "./scope";

type Props = {
  scope: Record<string, HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>>>,
  markup: Record<string, HTMLGenerator<MarkupNode>>
};

function htmlRoot({ scope, markup }: Props): HTMLGenerator<RootNode> {
  const generator = htmlScope(scope, markup);

  return (node: RootNode) => {
    const metainfo: Record<string, string> = {};
    const childrenHtmlOutput = [];

    for (let child of node.children) {
      if (child.type === "directive") {
        metainfo.version = child.version;
        continue;
      }

      childrenHtmlOutput.push(generator(child));
    }

    const success = childrenHtmlOutput.filter(output => output.status === "success");
    const fail = childrenHtmlOutput.filter(output => output.status === "fail");

    if(fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      };
    }

    return {
      status: "success",
      meta: metainfo,
      html: success.map(output => output.html).join(""),
    };
  };
}

export default htmlRoot;