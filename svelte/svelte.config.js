import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		vite: {
			server: {
				fs: {
					strict: false
				}
			},
			optimizeDeps: {
				include: ['lottie-web', 'electron', '@vime/core', '@vime/svelte']
			},
			ssr: {
				external: ['electron']
			},
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			pages: '../dist/www',
			assets: '../dist/www'
			// fallback: null
		}),
		files:{
			routes: 'src/routes',
		},
		appDir: '_app',
		router: true,
		ssr: false
	}
};

export default config;
