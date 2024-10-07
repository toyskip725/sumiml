async function check(Component, props, slots, metadata) {
  return Component["type"] && Component.type === "sumiml";
}

async function renderToStaticMarkup(Component, props, slots, metadata) {
  try {
    return {
      html: Component.content,
    };
  } catch {
    console.error("error: renderToStaticMarkup");
  };
}

export default {
  name: "@sumiml/astro-integration",
  check,
  renderToStaticMarkup,
};