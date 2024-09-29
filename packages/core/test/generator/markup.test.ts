import { test, expect, describe } from 'vitest';
import { GeneratorOutput, HTMLOutput } from '../../src/generator/generator';
import { MarkupNode } from '../../src/syntax/markup';
import htmlMarkup from '../../src/html/markup';
import htmlBold from '../../src/html/bold';

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
      html: "<div class=\"Sample\">abc</div>",
    });
  });

  test("success2", () => {
    // Arrange
    const node: MarkupNode = {
      type: "markup",
      tagname: "Bold",
      attributes: {},
      content: "abc",
    };
    const generator = htmlMarkup({
      "Bold": htmlBold, 
    });

    // Act
    const output = generator(node);

    // Assert
    expect(output).toEqual<GeneratorOutput<HTMLOutput>>({
      status: "success",
      meta: {},
      html: "<b>abc</b>",
    });
  });
});