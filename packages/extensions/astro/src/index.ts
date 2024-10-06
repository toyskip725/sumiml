import { Plugin } from "vite";
import { AstroIntegration } from "astro";

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
        return {
          code: `
            const sumimlDocument = {
              type: "sumiml",
              content: "<p>transformed!</p>"
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