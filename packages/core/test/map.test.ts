import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../src/parser/parser';
import character from '../src/parser/character';
import map from '../src/parser/map';

describe("map", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "abc";
    const char1 = character("a");
    const parser = map(char1, (c: string) => {
      return {
        type: "mapped",
        value: c,
      };
    });

    // Act 
    const output = parser(sample1);

    // Assert 
    expect(output).toEqual<ParseOutput<{ type: string; value: string; }>>({
      status: "success",
      data: {
        type: "mapped",
        value: "a",
      },
      rest: "bc",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample2 = "abc";
    const char = character("x");
    const parser = map(char, (c: string) => {
      return {
        type: "mapped",
        value: c,
      };
    });

    // Act
    const output = parser(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<{ type: string; value: string; }>>({
      status: "fail"
    });
  });
});