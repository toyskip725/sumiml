import { test, expect, describe } from 'vitest';
import { ParseOutput } from '../../src/parser/parser';
import { readFile } from 'fs/promises';
import root from '../../src/syntax/root';

describe("root", () => {
  test("success1", async () => {
    // Arrange
    const input = await readFile(`${process.cwd()}/packages/core/example/sample1.suml`, { encoding: 'utf8' });
    
    // Act
    const output = root(input.replace(/\r\n/g, "").replace(/"/g, "\""));

    // Assert
    expect(output.status).toBe("success");
  });
});