import concat from "../parser/concat";
import directive, { DirectiveNode } from "./directive";
import frontmatter from "./frontmatter";
import document from "./document";
import { ScopeNode } from "./scope";
import map from "../parser/map";
import { ParseTagSpecs } from "./specs";
import { Parser } from "../parser/parser";

export type RootContentNode = DirectiveNode | ScopeNode;
export type RootNode = {
  type: "root";
  children: Array<RootContentNode>;
};

function root (specs: ParseTagSpecs): Parser<RootNode> {
  const rootInternal = concat<RootContentNode>([
    directive,
    frontmatter,
    document(specs),
  ]);

  return map(rootInternal, (output: RootContentNode[]) => {
    return {
      type: "root",
      children: output,
    } as RootNode;
  });
}

export default root;