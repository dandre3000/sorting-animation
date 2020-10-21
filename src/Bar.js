export const UNSORTED = 'white'
export const SORTED = 'green'
export const PIVOT = 'purple'

export const Bar = class {
	constructor(v) {
		this.value = v
		this.status = UNSORTED
	}
	
	render(canv, ctx, step, array, i) {
		const w = canv.width / (array.length * 2)
		
		ctx.fillStyle = this.status
		if (step.type == 'comparison' || step.type == 'swap' || step.type == 'splice') {
			const { index1, index2 } = step
			
			if (i == index1) {
				ctx.fillStyle = 'red'
			} else if (i == index2) {
				ctx.fillStyle = 'blue'
			}
		} else if (step.type == 'end') {
			ctx.fillStyle = SORTED
		}
		
		ctx.fillRect(i * w * 2 + w / 2, canv.height, w, -this.value * (canv.height / 100))
	}
}