import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import character from '../../src/parser/character';
import or from '../../src/parser/or';

describe("or", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "abc";
    const p1 = character("a");
    const p2 = character("b");
    const parser = or([p1, p2]);

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "success",
      data: "a",
      rest: "bc",
    });
  });

  test("success2", () => {
    // Arrange
    const sample1 = "abc";
    const p1 = character("b");
    const p2 = character("a");
    const parser = or([p1, p2]);

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "success",
      data: "a",
      rest: "bc",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample1 = "abc";
    const p1 = character("x");
    const p2 = character("y");
    const parser = or([p1, p2]);

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "fail",
    });
  });
});