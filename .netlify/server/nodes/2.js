

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.B_uxJNRZ.js","_app/immutable/chunks/NkJkNMXC.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BOJXQArJ.js"];
export const stylesheets = ["_app/immutable/assets/2.bIvfsCul.css"];
export const fonts = [];
