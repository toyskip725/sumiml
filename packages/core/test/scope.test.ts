import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../src/parser/parser';
import scope, { ScopeNode } from '../src/syntax/scope';

describe("scope", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "<Sample>Hello.\r\n\r\nthis is a sample.</Sample>";
    const parser = scope();

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<ScopeNode>>({
      status: "success",
      data: {
        type: "scope",
        tagname: "Sample",
        attributes: {},
        children: [
          { type: "text", content: "Hello.", },
          { type: "newline", },
          { type: "text", content: "this is a sample.", },
        ],
      },
      rest: "",
    });
  });

  test("success2", () => {
    // Arrange
    const sample2 = "<Sample title=\"sample\">Hello.\r\n\r\nthis is a <Bold>sample.</Bold></Sample>";
    const parser = scope();

    // Act
    const output = parser(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<ScopeNode>>({
      status: "success",
      data: {
        type: "scope",
        tagname: "Sample",
        attributes: {
          title: "sample",
        },
        children: [
          { type: "text", content: "Hello.", },
          { type: "newline", },
          { type: "text", content: "this is a ", },
          { type: "markup", tagname: "Bold", attributes: {}, content: "sample.", },
        ],
      },
      rest: "",
    });
  });
});