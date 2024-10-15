import root from "../syntax/root";

export type Metadata = {
  frontmatter: any;
};

function metadata (input: string): Metadata {
  const parser = root({
    scope: [],
    enumeration: [],
    display: [],
    markup: [],
  });

  const rootNode = parser(input);
  if (rootNode.status === "fail") {
    throw new Error("parse failed");
  }

  return {
    frontmatter: rootNode.data.frontmatter,
  };
};

export default metadata;