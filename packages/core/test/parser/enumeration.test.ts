import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import list, { ListNode } from '../../src/syntax/list';
import enumeration, { EnumerationNode } from '../../src/syntax/enumeration';

describe("enumeration", () => {
  test("success1", () => {
    // Arrange
    const sample = `
    <List type="ordered">
      </> abc
      </> def
    </List>`;
    const parser = enumeration("List", { scope: [], display: [], markup: [] });

    // Act
    const output = parser(sample.trimStart());

    // Assert
    expect(output).toEqual<ParseOutput<EnumerationNode>>({
      status: "success",
      data: {
        type: "enumeration",
        tagname: "List",
        attributes: {
          type: "ordered",
        },
        children: [
          { 
            type: "item",
            content: [{ type: "text", content: "abc" }],
          },
          { 
            type: "item",
            content: [{ type: "text", content: "def" }],
          },
        ],
      },
      rest: "",
    });
  });

  test("success2", () => {
    // Arrange
    const sample = `
    <List type="ordered">
      </> this is item1.
      </> this is item2.
      <List type="itemized">
        </> this is item2.1.
        </> this is item2.2.
      </List>
    </List>`;
    const parser = enumeration("List", { scope: [], display: [], markup: [] });

    // Act
    const output = parser(sample.trimStart());

    // Assert
    expect(output).toEqual<ParseOutput<EnumerationNode>>({
      status: "success",
      data: {
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
      },
      rest: "",
    });
  });
});