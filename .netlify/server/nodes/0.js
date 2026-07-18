

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DDbcAAsW.js","_app/immutable/chunks/B4VL9cD1.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/mmAPDwJ5.js"];
export const stylesheets = ["_app/immutable/assets/0.Crfb76QQ.css"];
export const fonts = [];
