import { i as head } from "../../chunks/server.js";
import "../../chunks/stores.svelte.js";
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>aishe — voice-first CLI for Bharat</title>`);
			});
			$$renderer.push(`<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,&lt;svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>&lt;circle cx='16' cy='16' r='14' fill='%237C3AED'/>&lt;text x='16' y='21' text-anchor='middle' font-size='14' font-family='serif' font-weight='600' fill='white'>a&lt;/text>&lt;/svg>"/>`);
		});
		$$renderer.push(`<div class="min-h-screen w-full" style="background-color: var(--color-paper);">`);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _layout as default };
