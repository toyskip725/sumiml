import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import openingTag, { OpeningTag } from '../../src/syntax/openingTag';

describe("openingTag", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "<Test>";
    
    // Act
    const output = openingTag(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<OpeningTag>>({
      status: "success",
      data: {
        tagname: "Test",
        attributes: {},
      },
      rest: "",
    });
  });

  test("success2", () => {
    // Arrange
    const sample2 = "<Sample name=\"test2\">";

    // Act
    const output = openingTag(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<OpeningTag>>({
      status: "success",
      data: {
        tagname: "Sample",
        attributes: {
          name: "test2",
        },
      },
      rest: "",
    });
  });

  test("success3", () => {
    // Arrange
    const sample3 = "<Sample title=\"test3\" path=\"sample/test3\">abc</Sample>"

    // Act
    const output = openingTag(sample3);

    // Assert
    expect(output).toEqual<ParseOutput<OpeningTag>>({
      status: "success",
      data: {
        tagname: "Sample",
        attributes: {
          title: "test3",
          path: "sample/test3",
        },
      },
      rest: "abc</Sample>",
    });
  });
});