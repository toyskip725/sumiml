type ParseSuccessOutput<T> = {
  result: "success";
  data: T;
  rest: string;
};

type ParseFailOutput = {
  result: "fail";
};

export type ParseOutput<T> = ParseSuccessOutput<T> | ParseFailOutput;
export type Parser<T> = (input: string) => ParseOutput<T>;