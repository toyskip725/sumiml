import map from "../parser/map";
import str from "../parser/str";

export type NewLineNode = {
  type: "newline",
};

const newline = map(str("\r\n\r\n"), (_output: string) => {
  return {
    type: "newline",
  } as NewLineNode;
});

export default newline;