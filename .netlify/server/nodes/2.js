

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.zccsR60L.js","_app/immutable/chunks/B4VL9cD1.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/mmAPDwJ5.js"];
export const stylesheets = ["_app/immutable/assets/2.bIvfsCul.css"];
export const fonts = [];
