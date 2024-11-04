import directive from "../syntax/directive";
import frontmatter from "../syntax/frontmatter";
import { crlf } from "../syntax/newline";

export type Metadata = {
  frontmatter: any;
};

function metadata (input: string): Metadata {
  let rest = input;
    
  // directive
  const directiveResult = directive(rest);
  if (directiveResult.status === "fail") {
    throw new Error(`invalid SumiML format: ${directiveResult.message}`);
  }
  const remove = crlf(directiveResult.rest);
  if (remove.status === "fail") {
    throw new Error(`invalid SumiML format: : ${remove.message}`);
  }
  rest = remove.rest;

  // frontmatter
  const frontmatterResult = frontmatter(rest);
  if (frontmatterResult.status === "fail") {
    throw new Error(`parse failed: ${frontmatterResult.message}`);
  }

  return {
    frontmatter: frontmatterResult.data.attributes,
  };
};

export default metadata;