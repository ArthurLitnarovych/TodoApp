import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ViteAliases } from 'vite-aliases';
import EnvironmentPlugin from 'vite-plugin-environment';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		ViteAliases(),
		EnvironmentPlugin('all'),
		pluginRewriteAll(),
	],
	server: {
		host: true,
	},
});
