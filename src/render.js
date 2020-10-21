import store from './store'

export const render = () => {
	const array = store.state.array
	const sequence = store.state.sequence
	const canv = store.state.canvas
	const ctx = canv.getContext('2d')
	
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canv.width, canv.height)
	
	array.forEach((bar, i) => {
		bar.render(canv, ctx, sequence[sequence.index], array, i)
	})
	
	ctx.fillStyle = 'white'
	ctx.fillText(`Comparisons: ${sequence? sequence.comparisons : 0}`, 16, 16)
	ctx.fillText(`Swaps: ${sequence? sequence.swaps : 0}`, 16, 32)
}