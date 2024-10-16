import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import listItem, { ListItemNode } from '../../src/syntax/listItem';
import enumerationItem, { EnumerationItemNode } from '../../src/syntax/enumerationitem';

describe("enumerationItem", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "</> this is sample.";
    const parser = enumerationItem({
      scope: [],
      display: [],
      markup: [],
    });

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<EnumerationItemNode>>({
      status: "success",
      data: {
        type: "item",
        content: [
          { type: "text", content: "this is sample." },
        ],
      },
      rest: "",
    });
  });

  test("success2", () => {
    // Arrange
    const sample2 = "</> this is <Strong>sample</Strong>.";
    const parser = enumerationItem({
      scope: [],
      display: [],
      markup: ["Strong"],
    });

    // Act
    const output = parser(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<EnumerationItemNode>>({
      status: "success",
      data: {
        type: "item",
        content: [
          { type: "text", content: "this is " },
          { type: "markup", tagname: "Strong", "attributes": {}, content: "sample" },
          { type: "text", content: "." },
        ],
      },
      rest: "",
    });
  });

  test("success3", () => {
    // Arrange
    const sample3 = `
    </> this is item1.
    </> this is item2.`;
    const parser = enumerationItem({
      scope: [],
      display: [],
      markup: [],
    });

    // Act
    const output = parser(sample3);

    // Assert
    expect(output).toEqual<ParseOutput<EnumerationItemNode>>({
      status: "success",
      data: {
        type: "item",
        content: [
          { type: "text", content: "this is item1." },
        ],
      },
      rest: "</> this is item2.",
    });
  });
});