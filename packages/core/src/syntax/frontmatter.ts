import { Parser } from "../parser/parser";
import regexp from "../parser/regexp";
import str from "../parser/str";
import openingTag from "./openingTag";
import textContent from "./textContent";
import YAML from "yaml";

export type FrontmatterNode = {
  type: "frontmatter";
  attributes: unknown;
};

const frontmatter: Parser<FrontmatterNode> = (input: string) => {
  const openTag = openingTag(input);
  if(openTag.status === "fail") {
    return openTag;
  }
  if (openTag.data.tagname !== "Frontmatter") {
    return {
      status: "fail",
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
      attributes: contentAsYaml as unknown,
    },
    rest: closingTag.rest,
  };
};

export default frontmatter;