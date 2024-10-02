import directive, { DirectiveNode } from "./directive";
import frontmatter, { FrontmatterNode } from "./frontmatter";
import document from "./document";
import { ScopeNode } from "./scope";
import { ParseTagSpecs } from "./specs";
import { Parser } from "../parser/parser";
import { crlf } from "./newline";

export type RootContentNode = DirectiveNode | FrontmatterNode | ScopeNode;
export type RootNode = {
  type: "root";
  version: string;
  frontmatter: Record<string, unknown>;
  content: ScopeNode;
};

function root (specs: ParseTagSpecs): Parser<RootNode> {
  return (input: string) => {
    let rest = input;
    
    // directive
    const directiveResult = directive(rest);
    if (directiveResult.status === "fail") {
      return directiveResult;
    }
    const remove = crlf(directiveResult.rest);
    if (remove.status === "fail") {
      return remove;
    }
    rest = remove.rest;

    // frontmatter
    const frontmatterResult = frontmatter(rest);
    if (frontmatterResult.status === "fail") {
      return frontmatterResult;
    }
    const remove2 = crlf(frontmatterResult.rest);
    if (remove2.status === "fail") {
      return remove2;
    }
    rest = remove2.rest;

    // document
    const documentResult = document(specs)(rest);
    if (documentResult.status === "fail") {
      return documentResult;
    }

    return {
      status: "success",
      data: {
        type: "root",
        version: directiveResult.data.version,
        frontmatter: frontmatterResult.data.attributes,
        content: documentResult.data,
      },
      rest: documentResult.rest,
    };
  };
}

export default root;