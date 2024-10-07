import { Parser } from "../parser/parser";
import regexp from "../parser/regexp";
import str from "../parser/str";
import { formatErrorPosition } from "../util/format";
import openingTag from "./openingTag";
import YAML from "yaml";

export type FrontmatterNode = {
  type: "frontmatter";
  attributes: Record<string, unknown>;
};

const frontmatter: Parser<FrontmatterNode> = (input: string) => {
  const openTag = openingTag(input);
  if(openTag.status === "fail") {
    return openTag;
  }
  if (openTag.data.tagname !== "Frontmatter") {
    return {
      status: "fail",
      message: `[frontmatter] tagname should be "frontmatter": ${formatErrorPosition(input)}`,
    };
  }

  const content = regexp(/^[^<]+/g)(openTag.rest);
  if(content.status === "fail") {
    return content;
  }
  const contentAsYaml = YAML.parse(content.data);

  const closingTag = str("</Frontmatter>")(content.rest);
  if (closingTag.status === "fail") {
    return closingTag;
  }

  return {
    status: "success",
    data: {
      type: "frontmatter",
      attributes: contentAsYaml as Record<string, unknown>,
    },
    rest: closingTag.rest,
  };
};

export default frontmatter;