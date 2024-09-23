import character from "../parser/character";
import concat from "../parser/concat";
import map from "../parser/map";
import regexp from "../parser/regexp";

export type Attribute = {
  name: string;
  value: string;
};

const attributeInternal = concat([
  regexp(/[a-z]+/g),
  character("="),
  regexp(/[^>\s]+/g),
]);

const attribute = map<string[], Attribute>(attributeInternal, (output) => {
  const value = output[2].includes("\"") ? output[2].replace("\"", "").replace("\"", "") : output[2];

  return {
    name: output[0],
    value: value,
  };
});

export default attribute;