import { HTMLGenerator, HTMLGeneratorFactory, HTMLReducerGenerator } from "../generator/generator";
import { DisplayNode } from "../syntax/display";
import { MarkupNode } from "../syntax/markup";
import { RootNode } from "../syntax/root";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";
import htmlScope from "./scope";

type Props = {
  scope: Record<string, HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>>>;
  display: Record<string, HTMLGenerator<DisplayNode>>;
  markup: Record<string, HTMLGenerator<MarkupNode>>;
};

function htmlRoot({ scope, display, markup }: Props): HTMLGenerator<RootNode> {
  const generator = htmlScope(scope, display, markup);

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