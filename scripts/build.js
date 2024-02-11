import dts from 'bun-plugin-dts'

await Bun.build({
	entrypoints: ['./src/main.ts'],
	outdir: './dist',
	plugins: [dts()],
})
