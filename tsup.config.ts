import { defineConfig } from 'tsup'

export default defineConfig({
	clean: true,
	define: {
		'import.meta.vitest': 'false',
	},
	dts: true,
	entry: ['src/main.ts'],
	format: ['esm'],
	minify: true,
	onSuccess() {
		// Without this, the build process doesn't properly return on completion
		// when run inside containers.
		process.exit(0)
	},
	outDir: 'dist',
	splitting: false,
	target: 'node20',
	treeshake: true,
})
