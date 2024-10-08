import { type Plugin } from "vite";
import { type AstroIntegration } from "astro";
import { htmlCompiler } from "@sumiml/core";

const getSumimlRenderer = () => {
  return {
    name: "@sumiml/astro-integration",
    serverEntrypoint: "@sumiml/astro-integration/src/server.js",
  };
}

const viteSumimlPlugin = (): Plugin => {
  return {
    name: "vite-plugin-sumiml-astro",
    transform(code, id) {
      if (id.endsWith(".suml")) {
        // id: filepath
        // code: whole content of .suml file 
        const compiler = htmlCompiler();
        const output = compiler(code);

        return {
          code: `
            const sumimlDocument = {
              type: "sumiml",
              content: \`${output.status === "success" ? output.html : "<p>" + output.message + "</p>"}\`,
            };
            export default sumimlDocument;
          `,
        };
      }
      
      return code;
    }
  };
};

const sumiml = (): AstroIntegration => {
  return {
    name: "@sumiml/astro-integration",
    hooks: {
      "astro:config:setup": ({ addRenderer, updateConfig }) => {
        addRenderer(getSumimlRenderer());
        updateConfig({
          vite: {
            plugins: [viteSumimlPlugin()],
          }
        });
      },
    },
  };
}

export default sumiml;