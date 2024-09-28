import character from "../parser/character";
import concat from "../parser/concat";
import many from "../parser/many";
import map from "../parser/map";
import regexp from "../parser/regexp";
import whitespace from "../parser/whitespace";
import attribute, { type Attribute } from "./attribute";

type AttributeSequence = null | Attribute;
export type OpeningTag = {
  tagname: string;
  attributes: Record<string, string>;
};

const openingTagInternal = concat<string | AttributeSequence[][]>([
  character("<"),
  regexp(/^[^>\s]+/g),
  many(concat<AttributeSequence>([whitespace(), attribute])),
  character(">"),
]);

const openingTag = map(openingTagInternal, (output) => {
  let attributes: Record<string, string> = {};
  if (Array.isArray(output[2])) {
    for (let attribute of output[2]) {
      if (attribute[1] !== null) {
        attributes[attribute[1].name] = attribute[1].value;
      }
    }
  }

  return {
    tagname: output[1],
    attributes: attributes,
  } as OpeningTag;
});

export default openingTag;