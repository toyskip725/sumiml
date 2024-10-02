import map from "../parser/map";
import regexp from "../parser/regexp";

export type NewLineNode = {
  type: "newline",
};

const newline = map(regexp(/^\r\n(\r\n)+/g), (_output: string) => {
  return {
    type: "newline",
  } as NewLineNode;
});

export const crlf = map(regexp(/^(\r\n)+/g), (_output: string) => {
  return {
    type: "newline",
  } as NewLineNode;
});

export default newline;