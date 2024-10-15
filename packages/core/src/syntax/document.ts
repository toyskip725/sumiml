import { Parser } from "../parser/parser";
import scope, { ScopeNode } from "./scope";
import { ParserConfig } from "./parserConfig";

function document(specs?: ParserConfig): Parser<ScopeNode> {
  return scope("Document", specs);
}

export default document;