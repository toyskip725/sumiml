import { test, expect, describe } from 'vitest';
import { readFile, writeFile } from 'fs/promises';
import root from '../../src/syntax/root';
import htmlRoot from '../../src/html/root';
import htmlSection from '../../src/html/section';
import htmlSubsection from '../../src/html/subsection';
import htmlSubsubsection from '../../src/html/subsubsection';
import htmlLink from '../../src/html/link';
import htmlMath from '../../src/html/math';
import htmlStrong from '../../src/html/strong';

describe("root: html generator", () => {
  test("success1", async () => {
    // Arrange
    const input = await readFile(`${process.cwd()}/packages/core/example/sample1.suml`, { encoding: 'utf8' });
    const parser = root({
      scope: ["Section"],
      display: [],
      markup: ["Strong"],
    });
    const node = parser(input.replace(/"/g, "\""));
    if (node.status === "fail") {
      return;
    }

    const generator = htmlRoot({
      scope: {
        "Section": htmlSection,
      },
      display: {},
      markup: {
        "Strong": htmlStrong,
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
      display: ["Math"],
      markup: ["Strong", "Link"],
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
      display: {
        "Math": htmlMath,
      },
      markup: {
        "Strong": htmlStrong,
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

  test("success3", async () => {
    // Arrange
    const input = await readFile(`${process.cwd()}/packages/core/example/sample3.suml`, { encoding: 'utf8' });
    const parser = root({
      scope: ["Section"],
      display: [],
      markup: [],
    });
    const node = parser(input.replace(/"/g, "\""));
    if (node.status === "fail") {
      return;
    }

    const generator = htmlRoot({
      scope: {
        "Section": htmlSection,
      },
      display: {},
      markup: {}
    });
    
    // Act
    const output = generator(node.data);

    // Assert
    if(output.status === "success") {
      await writeFile(`${process.cwd()}/packages/core/example/sample3.html`, output.html, { encoding: 'utf8' });
      expect(output.status).toBe("success");
    }

    expect(output.status).toBe("success");
  });
});