import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../src/parser/parser';
import regexp from '../src/parser/regexp';

describe("regexp", () => {
  test("success1", () => {
    // Arrange
    const sample1 = "[hello]abc";
    const parser = regexp(/^\[.+?\]/y);

    // Act
    const output = parser(sample1);

    // Assert
    expect(output).toEqual<ParseOutput<string>>({
      status: "success",
      data: "[hello]",
      rest: "abc",
    });
  });
});