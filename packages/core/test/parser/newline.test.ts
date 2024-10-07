import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import newline, { NewLineNode } from '../../src/syntax/newline';

describe("newline", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "\r\n\r\nabc";

    // Act
    const output = newline(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<NewLineNode>>({
      status: "success",
      data: {
        type: "newline",
      },
      rest: "abc",
    });
  });

  test("success2", () => {
    // Arrange
    const sample2 = "\r\n\r\n\r\nabc";

    // Act
    const output = newline(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<NewLineNode>>({
      status: "success",
      data: {
        type: "newline",
      },
      rest: "abc",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample3 = "\r\nabc";

    // Act
    const output = newline(sample3);

    // Assert
    expect(output).toEqual<ParseOutput<NewLineNode>>({
      status: "fail",
      message: "[regexp] match failed: \r\nabc",
    });
  });
});