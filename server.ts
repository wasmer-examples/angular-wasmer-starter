import { renderApplication } from "@angular/platform-server";
import bootstrap from "./src/main.server";

interface Env {
	ASSETS: { fetch: typeof fetch };
}

// We attach the `fetch()` handler to the global scope
// so that we can export it when we process the Angular output.
// See tools/bundle.mjs
async function workerFetchHandler(request: Request, env: Env) {
	const url = new URL(request.url);
	console.log("renders SSR", url.href);

	// Get the root `index.html` content.
	const indexUrl = new URL("/", url);
	const indexResponse = await env.ASSETS.fetch(new Request(indexUrl));
	const document = await indexResponse.text();

	const content = await renderApplication(bootstrap, {
		document,
		url: url.pathname,
	});

	// console.log("rendered SSR", content);
	return new Response(content, indexResponse);
}

export default {
	fetch(request: Request, env: Env) {
		return Promise.resolve(workerFetchHandler(request, env));
	}
};
