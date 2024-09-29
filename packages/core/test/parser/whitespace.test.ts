import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import whitespace from '../../src/parser/whitespace';

describe("whitespace", () => {
  const parser = whitespace();

  test("success1", () => {
    // Arrange
    const sample1 = "   abc";

    // Act
    const output = parser(sample1);

    //Assert
    expect(output).toEqual<ParseOutput<null>>({
      status: "success",
      data: null,
      rest: "abc",
    });
  });

  test("success2", () => {
    // Arrange
    const sample2 = "abc";

    // Act
    const output = parser(sample2);

    //Assert
    expect(output).toEqual<ParseOutput<null>>({
      status: "success",
      data: null,
      rest: "abc",
    });
  });
});