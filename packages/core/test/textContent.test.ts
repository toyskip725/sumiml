import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../src/parser/parser';
import textContent, { TextContentNode } from '../src/syntax/textContent';

describe("text", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "abcabc<Test />";

    // Act
    const output = textContent(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<TextContentNode>>({
      status: "success",
      data: {
        type: "text",
        content: "abcabc",
      },
      rest: "<Test />",
    });
  });

  test("success2", () => {
    // Arrange
    const sample2 = "abc\n\nxyz";

    // Act
    const output = textContent(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<TextContentNode>>({
      status: "success",
      data: {
        type: "text",
        content: "abc",
      },
      rest: "\n\nxyz",
    });
  });
});