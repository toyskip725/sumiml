import { test, expect, describe } from 'vitest';
import { GeneratorOutput, HTMLOutput } from '../../src/generator/generator';
import { ListNode } from '../../src/syntax/list';
import htmlList from '../../src/html/list';

describe("list: html generator", () => {
  test("success1", () => {
    // Arrange
    const node: ListNode = {
      type: "list",
      listtype: "ordered",
      children: [
        { 
          type: "listitem",
          content: [{ type: "text", content: "this is item1." }],
        },
        { 
          type: "listitem",
          content: [
            { 
              type: "text", 
              content: "this is item2." 
            },
            {
              type: "list",
              listtype: "itemized",
              children: [
                {
                  type: "listitem",
                  content: [{ type: "text", content: "this is item2.1." }],
                },
                {
                  type: "listitem",
                  content: [{ type: "text", content: "this is item2.2." }],
                },
              ]
            }
          ],
        },
      ],
    };

    // Act
    const output = htmlList({})(node);

    // Assert
    expect(output).toEqual<GeneratorOutput<HTMLOutput>>({
      status: "success",
      meta: {},
      html: "<ol><li>this is item1.</li><li>this is item2.<ul><li>this is item2.1.</li><li>this is item2.2.</li></ul></li></ol>",
    });
  });
});