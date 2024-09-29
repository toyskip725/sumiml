import { test, expect, describe } from 'vitest';
import { GeneratorOutput, HTMLOutput } from '../../src/generator/generator';
import { TextContentNode } from '../../src/syntax/textContent';
import htmlTextContent from '../../src/html/textContent';

describe("textContent: html generator", () => {
  test("success1", () => {
    // Arrange
    const node: TextContentNode = {
      type: "text",
      content: "abc",
    };
    // Act
    const output = htmlTextContent(node);

    // Assert
    expect(output).toEqual<GeneratorOutput<HTMLOutput>>({
      status: "success",
      meta: {},
      html: "<p>abc</p>"
    });
  });
});