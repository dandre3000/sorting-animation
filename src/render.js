import store from './store'

export const render = () => {
	const array = store.state.array
	const sequence = store.state.sequence
	const canv = store.state.canvas
	const ctx = canv.getContext('2d')
	
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canv.width, canv.height)
	
	
	
	const barW = canv.width / (array.length * 2)
	array.forEach((v, i) => {
		ctx.fillStyle = 'white'
		
		if (sequence) {
			const {index1, index2} = sequence[sequence.index]
			if (i == index1 || i == index2) {
				ctx.fillStyle = 'green'
			}
		}
		
		ctx.fillRect(i * barW * 2, canv.height, barW, -v * (canv.height / 100))
	})
}