import { type Color, generateColor } from './color-generator'

const color: Color = await generateColor(
	'Imagine a color that is a mix of electric deep ocean blue and the aura of gold bullion.',
)

console.log(color)
