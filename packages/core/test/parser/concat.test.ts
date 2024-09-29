import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import character from '../../src/parser/character';
import concat from '../../src/parser/concat';

describe("concat", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "abc";
    const p1 = character("a");
    const p2 = character("b");
    const parser = concat([p1, p2]);

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<string[]>>({
      status: "success",
      data: ["a", "b"],
      rest: "c",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample2 = "abc";
    const p1 = character("a");
    const p2 = character("x");
    const parser = concat([p1, p2]);

    // Act
    const output = parser(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<string[]>>({
      status: "fail",
    });
  });
});