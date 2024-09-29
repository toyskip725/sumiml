import concat from "../parser/concat";
import directive, { DirectiveNode } from "./directive";
import frontmatter from "./frontmatter";
import document from "./document";
import { ScopeNode } from "./scope";
import map from "../parser/map";

export type RootContentNode = DirectiveNode | ScopeNode;
export type RootNode = {
  type: "root";
  children: Array<RootContentNode>;
};

const rootInternal = concat<RootContentNode>([
  directive,
  frontmatter,
  document,
]);

const root = map(rootInternal, (output: RootContentNode[]) => {
  return {
    type: "root",
    children: output,
  } as RootNode;
});

export default root;