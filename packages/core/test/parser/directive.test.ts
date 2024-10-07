import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import directive, { DirectiveNode } from '../../src/syntax/directive';

describe("directive", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "<SumiML version=\"1.0\" />aaa";

    // Act
    const output = directive(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<DirectiveNode>>({
      status: "success",
      data: {
        type: "directive",
        version: "1.0",
      },
      rest: "aaa",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample2 = "<sumiml />";

    // Act
    const output = directive(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<DirectiveNode>>({
      status: "fail",
      message: "[str] match failed: sumiml />",
    });
  });
});