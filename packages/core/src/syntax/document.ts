import { Parser } from "../parser/parser";
import scope, { ScopeNode } from "./scope";
import { ParseTagSpecs } from "./specs";

function document(specs?: ParseTagSpecs): Parser<ScopeNode> {
  return scope("Document", specs);
}

export default document;