import concat from "../parser/concat";
import directive, { DirectiveNode } from "./directive";
import frontmatter from "./frontmatter";
import document from "./document";
import { ScopeNode } from "./scope";
import map from "../parser/map";
import str from "../parser/str";

type RootNode = DirectiveNode | ScopeNode;
const rootInternal = concat<RootNode>([
  directive,
  frontmatter,
  document,
]);

const root = map(rootInternal, (output: RootNode[]) => {
  return {
    type: "root",
    children: output,
  };
});

export default root;