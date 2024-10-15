import { test, expect, describe } from 'vitest';
import { GeneratorOutput, HTMLOutput } from '@sumiml/core/src/generator/generator';
import { EnumerationNode } from '@sumiml/core/src/syntax/enumeration';
import htmlBibliography from '../src/html/bibliography';
import htmlMarkup from '@sumiml/core/src/html/markup';

describe("bibliography", () => {
  test("success1", () => {
    // Arrange
    const node: EnumerationNode = {
      type: "enumeration",
      tagname: "Bibliography",
      attributes: {},
      children: [
        {
          type: "item",
          content: [{ type: "text", content: "sample book 1" }],
        },
        {
          type: "item",
          content: [{ type: "text", content: "sample book 2" }],
        },
      ],
    };
    const generator = htmlBibliography(htmlMarkup({}));

    // Act
    const output = generator(node);

    // Assert
    expect(output).toEqual<GeneratorOutput<HTMLOutput>>({
      status: "success",
      meta: {},
      html: `<div class="bibliography"><p class="bibliography-heading">参考文献</p><ul class="bibliography-list"><li>[1] sample book 1</li><li>[2] sample book 2</li></ul></div>`,
    });
  });
});