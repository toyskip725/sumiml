import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import str from '../../src/parser/str';

describe("str", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "abcde";
    const parser = str("abc");

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "success",
      data: "abc",
      rest: "de",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample2 = "ab";
    const parser = str("abc");

    // Act
    const output = parser(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "fail",
    });
  });

  test("fail2", () => {
    // Arrage
    const sample3 = "abxyzw";
    const parser = str("abc");

    // Act
    const output = parser(sample3);

    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "fail",
    });
  });
});