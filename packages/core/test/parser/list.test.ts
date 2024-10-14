import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import list, { ListNode } from '../../src/syntax/list';

describe("list", () => {
  test("success1", () => {
    // Arrange
    const sample = `
    <List type="ordered">
      </> abc
      </> def
    </List>`;
    const parser = list({ scope: [], display: [], markup: [] });

    // Act
    const output = parser(sample.trimStart());

    // Assert
    expect(output).toEqual<ParseOutput<ListNode>>({
      status: "success",
      data: {
        type: "list",
        listtype: "ordered",
        children: [
          { 
            type: "listitem",
            content: [{ type: "text", content: "abc" }],
          },
          { 
            type: "listitem",
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
    const parser = list({ scope: [], display: [], markup: [] });

    // Act
    const output = parser(sample.trimStart());

    // Assert
    expect(output).toEqual<ParseOutput<ListNode>>({
      status: "success",
      data: {
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
      },
      rest: "",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample = `
    <List>
      </> abc
      </> def
    </List>`;
    const parser = list({ scope: [], display: [], markup: [] });

    // Act
    const output = parser(sample.trimStart());

    // Assert
    expect(output).toEqual<ParseOutput<ListNode>>({
      status: "fail",
      message: `[list] list requires attribute "type" to be "ordered" or "itemized": <List>
      </> abc..`, 
    });
  });
});