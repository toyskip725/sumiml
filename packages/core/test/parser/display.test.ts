import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import display, { DisplayNode } from '../../src/syntax/display';

describe("display", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "<Math>y = ax + b\r\ny' = cx' + d</Math>";
    const parser = display("Math");

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<DisplayNode>>({
      status: "success",
      data: {
        type: "display",
        tagname: "Math",
        attributes: {},
        content: "y = ax + b\r\ny' = cx' + d",
      },
      rest: "",
    });
  });
});