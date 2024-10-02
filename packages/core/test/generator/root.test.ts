import { test, expect, describe } from 'vitest';
import { readFile, writeFile } from 'fs/promises';
import root from '../../src/syntax/root';
import htmlRoot from '../../src/html/root';
import htmlBold from '../../src/html/bold';
import htmlSection from '../../src/html/section';
import htmlSubsection from '../../src/html/subsection';
import htmlSubsubsection from '../../src/html/subsubsection';
import htmlLink from '../../src/html/link';

describe("root: html generator", () => {
  test("success1", async () => {
    // Arrange
    const input = await readFile(`${process.cwd()}/packages/core/example/sample1.suml`, { encoding: 'utf8' });
    const parser = root({
      scope: ["Section"],
      markup: ["Bold"],
    });
    const node = parser(input.replace(/"/g, "\""));
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

  test("success2", async () => {
    // Arrange
    const input = await readFile(`${process.cwd()}/packages/core/example/sample2.suml`, { encoding: 'utf8' });
    const parser = root({
      scope: ["Section", "Subsection", "Subsubsection"],
      markup: ["Bold", "Link"],
    });
    const node = parser(input.replace(/"/g, "\""));
    if (node.status === "fail") {
      return;
    }

    const generator = htmlRoot({
      scope: {
        "Section": htmlSection,
        "Subsection": htmlSubsection,
        "Subsubsection": htmlSubsubsection,
      },
      markup: {
        "Bold": htmlBold,
        "Link": htmlLink,
      }
    });
    
    // Act
    const output = generator(node.data);

    // Assert
    if(output.status === "success") {
      await writeFile(`${process.cwd()}/packages/core/example/sample2.html`, output.html, { encoding: 'utf8' });
      expect(output.status).toBe("success");
    }

    expect(output.status).toBe("success");
  });
});