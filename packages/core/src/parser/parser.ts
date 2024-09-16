// Top-level interface of sumiML Parser
class Parser {
  constructor(config: ParserConfig) {

  }

  parse(document: string): SyntaxTreeNode {
    const root: SyntaxTreeNode = {
      type: "root",
      children: []
    };

    if(document.includes("<SumiML />")) {
      root.children.push({
        type: "directive",
        children: [],
      });
    }

    return root;
  }
}

interface ParserConfig {

}

interface SyntaxTreeNode {
  type: string;
  children: Array<SyntaxTreeNode>;
}

export {
  Parser,
  ParserConfig,
};