import store from './store'
import { SORTED, UNSORTED } from './Bar'

export const render = () => {
	const array = store.state.array
	const sequence = store.state.sequence
	const canv = store.state.canvas
	const ctx = canv.getContext('2d')
	
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canv.width, canv.height)
	
	
	
	const barW = canv.width / (array.length * 2)
	array.forEach((bar, i) => {
		ctx.fillStyle = 'white'
		
		
		
		if (sequence) {
			const step = sequence[sequence.index]
			
			if (step.type == 'comparison' || step.type == 'swap') {
				const {index1, index2} = step
				if (i == index1 || i == index2) {
					ctx.fillStyle = 'blue'
				}
			} else if (step.type == 'genesis') {
				bar.status =  UNSORTED
			} else if (step.type == 'end') {
				bar.status =  SORTED
			}
		}
		
		if (bar.status == SORTED) ctx.fillStyle = 'green'
		
		ctx.fillRect(i * barW * 2 + barW / 2, canv.height, barW, -bar.value * (canv.height / 100))
	})
}