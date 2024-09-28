import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../src/parser/parser';
import attribute, { type Attribute } from '../src/syntax/attribute';

describe("attribute", () => {
  const parser = attribute;

  test("success1", () => {
    // Arrange
    const sample1 = "name=\"Alice\"";
    
    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<Attribute>>({
      status: "success",
      data: {
        name: "name",
        value: "Alice",
      },
      rest: "",
    });
  });

  test("success2", () => {
    // Arrange
    const sample2 = "visible=False";

    // Act
    const output = parser(sample2);

    // Assert
    expect(output).toEqual<ParseOutput<Attribute>>({
      status: "success",
      data: {
        name: "visible",
        value: "False",
      },
      rest: "",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample3 = "some=";

    // Act
    const output = attribute(sample3);

    // Assert
    expect(output).toEqual<ParseOutput<Attribute>>({
      status: "fail",
    });
  });
});