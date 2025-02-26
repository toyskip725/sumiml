import { test, expect, describe } from 'vitest';
import character from '../../src/parser/character';
import { ParseOutput } from '../../src/parser/parser';

describe("character", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "<SumiML />";
    const parser = character("<");
    
    // Act
    const output = parser(sample1);
    
    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "success",
      data: "<",
      rest: "SumiML />",
    });
  });

  test("fail1", () => {
    // Arrange
    const sample2 = "abc";
    const parser = character("<");
    
    // Act
    const output = parser(sample2);
    
    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "fail",
      message: "[character] match failed: abc",
    });
  });

  test("fail2", () => {
    // Arrange
    const sample3 = "abc";
    const parser = character("ab");
    
    // Act
    const output = parser(sample3);
    
    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "fail",
      message: "[character] target must be a character",
    });
  })
})

