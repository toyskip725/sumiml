import character from "../parser/character";
import concat from "../parser/concat";
import map from "../parser/map";
import regexp from "../parser/regexp";
import str from "../parser/str";
import whitespace from "../parser/whitespace";

export type DirectiveSyntaxTreeNode = {
  type: "directive";
  version: string;
};

const directiveInternal = concat([
  character("<"),
  str("SumiML version="),
  regexp(/\"\d+\.\d+\"/y),
  whitespace(),
  character("/"),
  character(">")
]);

const directive = map(directiveInternal, (output => {
  if (output[2] === null) {
    return {
      status: "fail",
    };
  }
  
  const version = output[2].replace("\"", "").replace("\"", "");
  return {
    type: "directive",
    version: version,
  } as DirectiveSyntaxTreeNode;
}));

export default directive;