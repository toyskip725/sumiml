import { Parser } from "./parser";

function map<T, U>(parser: Parser<T>, f: (t: T) => U): Parser<U> {
  return (input: string) => {
    const precedent = parser(input);
    if (precedent.status === "fail") {
      return precedent;
    }

    return {
      status: "success",
      data: f(precedent.data),
      rest: precedent.rest,
    };
  };
}

export default map;