import { GeneratorOutput, HTMLGenerator, HTMLGeneratorFactory, HTMLOutput, HTMLReducerGenerator } from "../generator/generator";
import { MarkupNode } from "../syntax/markup";
import { ScopeContentNode, ScopeNode } from "../syntax/scope";
import { TextContentNode } from "../syntax/textContent";
import htmlMarkup from "./markup";
import htmlTextContent from "./textContent";

export const classifyNodes = (nodes: ScopeContentNode[]) :ScopeContentNode[][] => {
  // 連続するtext, markupはひとまとめにする
  // newlineは区切りと見做して以後の生成から除外する
  // scopeは単一ノードで生成単位とする
  const result: ScopeContentNode[][]  = [[]];
  let index = 0;
  for (let child of nodes) {
    if (child.type === "text" || child.type === "markup") {
      result[index].push(child);
    } else if (child.type === "scope") {
      if (result[index].length !== 0) {
        index++;
        result.push([]);
      }
      result[index].push(child);
      index++;
      result.push([]);
    } else {
      if (result[index].length !== 0) {
        index++;
        result.push([]);
      }
    }
  }

  if (result[index].length === 0) {
    result.pop();
  }

  return result;
};

function htmlScope(
  scopeGenerators: Record<string, HTMLGeneratorFactory<ScopeNode, HTMLReducerGenerator<ScopeContentNode>>>, 
  markupGenerators: Record<string, HTMLGenerator<MarkupNode>>
): HTMLGenerator<ScopeNode> {
  const htmlTextMarkup: HTMLGenerator<TextContentNode | MarkupNode> = (node: TextContentNode | MarkupNode) => {
    if (node.type === "text") {
      return htmlTextContent(node);
    }

    return htmlMarkup(markupGenerators)(node);
  };

  const generateScopeContent: HTMLReducerGenerator<ScopeContentNode> = (nodes: ScopeContentNode[]) => {
    if (nodes[0].type === "text" || nodes[0].type === "markup") {
      const htmlOutput = nodes.map(node => htmlTextMarkup(node as TextContentNode | MarkupNode));
      const success = htmlOutput.filter(output => output.status === "success");
      const fail = htmlOutput.filter(output => output.status === "fail");
      
      if (fail.length !== 0) {
        return {
          status: "fail",
          message: fail.map(output => output.message).join("\r\n"),
        } as GeneratorOutput<HTMLOutput>;
      }

      return {
        status: "success",
        meta: {},
        html: `<p>${success.map(output => output.html).join("")}</p>`,
      } as GeneratorOutput<HTMLOutput>;
    }

    const htmlOutput = nodes.map(node => htmlScope(scopeGenerators, markupGenerators)(node as ScopeNode));
    const success = htmlOutput.filter(output => output.status === "success");
    const fail = htmlOutput.filter(output => output.status === "fail");
    
    if (fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      } as GeneratorOutput<HTMLOutput>;
    }

    return {
      status: "success",
      meta: {},
      html: `${success.map(output => output.html).join("")}`,
    } as GeneratorOutput<HTMLOutput>;
  };

  return (node: ScopeNode) => {
    for (let keyword in scopeGenerators) {
      if (node.tagname === keyword) {
        return scopeGenerators[keyword](generateScopeContent)(node);
      }
    }

    const htmlOutput = classifyNodes(node.children).map(group => generateScopeContent(group));
    const success = htmlOutput.filter(output => output.status === "success");
    const fail = htmlOutput.filter(output => output.status === "fail");

    if(fail.length !== 0) {
      return {
        status: "fail",
        message: fail.map(output => output.message).join("\r\n"),
      };
    }

    return {
      status: "success",
      meta: {},
      html: `<div class="${node.tagname}">${success.map(output => output.html).join("")}</div>`,
    };
  };
}

export default htmlScope;