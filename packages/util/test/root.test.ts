import { core, htmlCompiler, preprocessor } from "@sumiml/core";
import { writeFile } from "fs/promises";
import { describe, expect, test } from "vitest";
import { util } from "../src";

describe("root: html generator", () => {
  test("success1", async () => {
    // Arrange
    const input = await preprocessor(`${process.cwd()}/packages/util/example/sample1.suml`);
    const compiler = htmlCompiler([core("html"), util("html")]);
    
    // Act
    const output = compiler(input);

    // Assert
    if(output.status === "success") {
      await writeFile(`${process.cwd()}/packages/util/example/sample1.html`, output.html, { encoding: 'utf-8' });
      expect(output.status).toBe("success");
    }

    expect(output.status).toBe("success");
  });
});