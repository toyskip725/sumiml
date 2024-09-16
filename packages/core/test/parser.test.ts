import { test, expect } from 'vitest';
import { Parser } from '../src/parser/parser';

test("sample1", () => {
  // Arrange
  const sample1 = "<SumiML />";
  const parser = new Parser({});
  
  // Act
  const result = parser.parse(sample1);
  
  // Assert
  expect(result.children.length).toBe(1);
  expect(result.children[0].type).toBe("directive");
});