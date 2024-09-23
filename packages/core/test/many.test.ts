import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../src/parser/parser';
import many from '../src/parser/many';
import character from '../src/parser/character';

describe("many", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "aaabc";
    const parser = many(character("a"));
    
    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<string[]>>({
      status: "success",
      data: ["a", "a", "a"],
      rest: "bc",
    });
  });
});