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
import htmlList from '../../src/html/list';
import htmlDocument from '../../src/html/document';

describe("root: html generator", () => {
  test("success1", async () => {
    // Arrange
    const input = await readFile(`${process.cwd()}/packages/core/example/sample1.suml`, { encoding: 'utf8' });
    const parser = root({
      scope: ["Document", "Section"],
      enumeration: [],
      display: [],
      markup: ["Strong"],
    });
    const node = parser(input.replace(/"/g, "\""));
    if (node.status === "fail") {
      return;
    }

    const generator = htmlRoot({
      scope: {
        "Document": htmlDocument,
        "Section": htmlSection,
      },
      enumeration: {},
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
      scope: ["Document", "Section", "Subsection", "Subsubsection"],
      enumeration: [],
      display: ["Math"],
      markup: ["Strong", "Link"],
    });
    const node = parser(input.replace(/"/g, "\""));
    if (node.status === "fail") {
      return;
    }

    const generator = htmlRoot({
      scope: {
        "Document": htmlDocument,
        "Section": htmlSection,
        "Subsection": htmlSubsection,
        "Subsubsection": htmlSubsubsection,
      },
      enumeration: {},
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
      scope: ["Document", "Section"],
      enumeration: [],
      display: [],
      markup: [],
    });
    const node = parser(input.replace(/"/g, "\""));
    if (node.status === "fail") {
      return;
    }

    const generator = htmlRoot({
      scope: {
        "Document": htmlDocument,
        "Section": htmlSection,
      },
      enumeration: {
        "List": htmlList,
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