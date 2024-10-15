import { test, expect, describe } from 'vitest';
import { GeneratorOutput, HTMLOutput } from '../../src/generator/generator';
import { MarkupNode } from '../../src/syntax/markup';
import htmlMarkup from '../../src/html/markup';
import htmlStrong from '../../src/html/strong';

describe("markup: html generator", () => {
  test("success1", () => {
    // Arrange
    const node: MarkupNode = {
      type: "markup",
      tagname: "Sample",
      attributes: {},
      content: "abc",
    };
    const generator = htmlMarkup({});

    // Act
    const output = generator(node);

    // Assert
    expect(output).toEqual<GeneratorOutput<HTMLOutput>>({
      status: "success",
      meta: {},
      html: "<div class=\"sample\">abc</div>",
    });
  });

  test("success2", () => {
    // Arrange
    const node: MarkupNode = {
      type: "markup",
      tagname: "Strong",
      attributes: {},
      content: "abc",
    };
    const generator = htmlMarkup({
      "Strong": htmlStrong, 
    });

    // Act
    const output = generator(node);

    // Assert
    expect(output).toEqual<GeneratorOutput<HTMLOutput>>({
      status: "success",
      meta: {},
      html: "<strong>abc</strong>",
    });
  });
});