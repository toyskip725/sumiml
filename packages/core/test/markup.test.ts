import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../src/parser/parser';
import markup, { MarkupNode } from '../src/syntax/markup';

describe("markup", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "<Sample title=\"test\">abc</Sample>";
    const parser = markup();

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<MarkupNode>>({
      status: "success",
      data: {
        type: "markup",
        tagname: "Sample",
        attributes: {
          title: "test",
        },
        content: "abc",
      },
      rest: "",
    });
  });

  test("success2", () => {
    // Arrange
    const sample2 = "<Sample title=\"test\">abc</Sample>";
    const parser = markup("Sample");

    // Act
    const output = parser(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<MarkupNode>>({
      status: "success",
      data: {
        type: "markup",
        tagname: "Sample",
        attributes: {
          title: "test",
        },
        content: "abc",
      },
      rest: "",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample3 = "<Sample title=\"test\">abc</Sample>";
    const parser = markup("XXX");

    // Act
    const output = parser(sample3);

    // Assert
    expect(output).toEqual<ParseOutput<MarkupNode>>({
      status: "fail",
    });
  });
});