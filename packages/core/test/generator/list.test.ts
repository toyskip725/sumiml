import { test, expect, describe } from 'vitest';
import { GeneratorOutput, HTMLOutput } from '../../src/generator/generator';
import htmlList from '../../src/html/list';
import htmlMarkup from '../../src/html/markup';
import { EnumerationNode } from '../../src/syntax/enumeration';

describe("list: html generator", () => {
  test("success1", () => {
    // Arrange
    const node: EnumerationNode = {
      type: "enumeration",
      tagname: "List",
      attributes: {
        type: "ordered",
      },
      children: [
        { 
          type: "item",
          content: [{ type: "text", content: "this is item1." }],
        },
        { 
          type: "item",
          content: [
            { 
              type: "text", 
              content: "this is item2." 
            },
            {
              type: "enumeration",
              tagname: "List",
              attributes: {
                type: "itemized",
              },
              children: [
                {
                  type: "item",
                  content: [{ type: "text", content: "this is item2.1." }],
                },
                {
                  type: "item",
                  content: [{ type: "text", content: "this is item2.2." }],
                },
              ]
            }
          ],
        },
      ],
    };

    // Act
    const output = htmlList(htmlMarkup({}))(node);

    // Assert
    expect(output).toEqual<GeneratorOutput<HTMLOutput>>({
      status: "success",
      meta: {},
      html: "<ol><li>this is item1.</li><li>this is item2.<ul><li>this is item2.1.</li><li>this is item2.2.</li></ul></li></ol>",
    });
  });
});