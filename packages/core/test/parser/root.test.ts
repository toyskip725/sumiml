import { test, expect, describe } from 'vitest';
import { readFile } from 'fs/promises';
import root from '../../src/syntax/root';

describe("root", () => {
  test("success1", async () => {
    // Arrange
    const input = await readFile(`${process.cwd()}/packages/core/example/sample1.suml`, { encoding: 'utf8' });
    const parser = root({
      scope: ["Section"],
      markup: ["Bold"],
    });
    
    // Act
    const output = parser(input.replace(/"/g, "\""));

    // Assert
    expect(output.status).toBe("success");
  });
});