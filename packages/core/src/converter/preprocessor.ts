import fs from "node:fs/promises";

async function preprocessor (filepath: string) {
  const input = await fs.readFile(filepath, { encoding: 'utf8' });
  return input
    .replace(/"/g, "\"")
    .replace("/$/g", "\$");
}

export default preprocessor;