import { ConverterConfig } from "../converter/config";
import { HTMLGenerator, HTMLGeneratorFactory, HTMLReducerGenerator } from "../generator/generator";
import { DisplayNode } from "../syntax/display";
import { MarkupNode } from "../syntax/markup";
import { RootNode } from "../syntax/root";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";
import htmlScope from "./scope";

function htmlRoot({ scope, enumeration, display, markup }: ConverterConfig): HTMLGenerator<RootNode> {
  const generator = htmlScope(scope, enumeration, display, markup);

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