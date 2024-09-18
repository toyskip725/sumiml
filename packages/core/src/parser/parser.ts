type ParseSuccessOutput<T> = {
  status: "success";
  data: T;
  rest: string;
};

type ParseFailOutput = {
  status: "fail";
};

export type ParseOutput<T> = ParseSuccessOutput<T> | ParseFailOutput;
export type Parser<T> = (input: string) => ParseOutput<T>;