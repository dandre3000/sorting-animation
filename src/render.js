import store from './store'
import { SORTED } from './Bar'

export const render = () => {
	const array = store.state.array
	const sequence = store.state.sequence
	const canv = store.state.canvas
	const ctx = canv.getContext('2d')
	
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canv.width, canv.height)
	
	
	
	const barW = canv.width / (array.length * 2)
	array.forEach((bar, i) => {
		ctx.fillStyle = bar.status == SORTED? 'green' : 'white'
		
		if (sequence) {
			const step = sequence[sequence.index]
			
			if (step.type == 'comparison' || step.type == 'swap') {
				const {index1, index2} = step
				if (i == index1) {
					ctx.fillStyle = 'red'
				} else if (i == index2) {
					ctx.fillStyle = 'blue'
				}
			} /* else if (step.type == 'genesis') {
				bar.status =  UNSORTED
			} else if (step.type == 'end') {
				bar.status =  SORTED
			} */
		}
		
		
		
		ctx.fillRect(i * barW * 2 + barW / 2, canv.height, barW, -bar.value * (canv.height / 100))
	})
	
	ctx.fillStyle = 'white'
	ctx.fillText(`Comparisons: ${sequence? sequence.comparisons : 0}`, 16, 16)
	ctx.fillText(`Swaps: ${sequence? sequence.swaps : 0}`, 16, 32)
}