import { test, expect, describe } from 'vitest';
import { readFile, writeFile } from 'fs/promises';
import root from '../../src/syntax/root';
import htmlRoot from '../../src/html/root';
import htmlBold from '../../src/html/bold';
import htmlSection from '../../src/html/section';

describe("root: html generator", () => {
  test("success1", async () => {
    // Arrange
    const input = await readFile(`${process.cwd()}/packages/core/example/sample1.suml`, { encoding: 'utf8' });
    const node = root(input.replace(/\r\n/g, "").replace(/"/g, "\""));
    if (node.status === "fail") {
      return;
    }

    const generator = htmlRoot({
      scope: {
        "Section": htmlSection,
      },
      markup: {
        "Bold": htmlBold,
      }
    });
    
    // Act
    const output = generator(node.data);

    // Assert
    if(output.status === "success") {
      await writeFile(`${process.cwd()}/packages/core/example/sample1.html`, output.html, { encoding: 'utf8' });
      expect(output.status).toBe("success");
    }

    expect(output.status).toBe("success");
  });
});