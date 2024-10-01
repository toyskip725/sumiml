import map from "../parser/map";
import regexp from "../parser/regexp";
import str from "../parser/str";

export type NewLineNode = {
  type: "newline",
};

const newline = map(regexp(/^\r\n(\r\n)+/g), (_output: string) => {
  return {
    type: "newline",
  } as NewLineNode;
});

export default newline;