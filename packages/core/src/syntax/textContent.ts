import map from "../parser/map";
import regexp from "../parser/regexp";

export type TextContentNode = {
  type: "text",
  content: string;
};

const textContent = map(regexp(/^[^<(\r\n\r\n)]+/g), (output: string) => {
  return {
    type: "text",
    content: output,
  } as TextContentNode;
});

export default textContent;