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
    const metainfo: Record<string, unknown> = {};

    // directive
    metainfo.version = node.version;
    // frontmatter
    for (let key in node.frontmatter) {
      metainfo[key] = node.frontmatter[key];
    }
    // document
    const document = generator(node.content);

    if (document.status === "fail") {
      return document;
    }

    return {
      status: "success",
      meta: metainfo,
      html: document.html,
    };
  };
}

export default htmlRoot;