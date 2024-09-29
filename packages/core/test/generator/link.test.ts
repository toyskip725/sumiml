import { test, expect, describe } from 'vitest';
import { GeneratorOutput, HTMLOutput } from '../../src/generator/generator';
import { MarkupNode } from '../../src/syntax/markup';
import htmlLink from '../../src/html/link';

describe("link: html generator", () => {
  test("success1", () => {
    // Arrange
    const node: MarkupNode = {
      type: "markup",
      tagname: "Link",
      attributes: {
        href: "http://test.sumiml",
      },
      content: "abc",
    };

    // Act
    const output = htmlLink(node);

    // Assert
    expect(output).toEqual<GeneratorOutput<HTMLOutput>>({
      status: "success",
      meta: {},
      html: "<a href=\"http://test.sumiml\">abc</a>"
    });
  });

  test("fail1", () => {
    // Arrange
    const node: MarkupNode = {
      type: "markup",
      tagname: "Link",
      attributes: {},
      content: "abc",
    };

    // Act
    const output = htmlLink(node);

    // Assert
    expect(output.status).toBe("fail");
  });
});