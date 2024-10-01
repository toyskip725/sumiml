import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import frontmatter, { FrontmatterNode } from '../../src/syntax/frontmatter';

describe("frontmatter", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "<Frontmatter>name: Sample\r\nnumber: 10\r\nvisible: true\r\n</Frontmatter>";

    // Act
    const output = frontmatter(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<FrontmatterNode>>({
      status: "success",
      data: {
        type: "frontmatter",
        attributes: {
          name: "Sample",
          number: 10,
          visible: true,
        },
      },
      rest: "",
    });
  });
});