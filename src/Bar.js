export const UNSORTED = 'white'
export const SORTED = 'green'
export const PIVOT = 'purple'

export const randomColor = () => {
	let i = Math.floor(Math.random()*3)
	let r = 0
	let g = 0
	let b = 0
	
	switch(i) {
		case 0:
			r = 255
			
			Math.floor(Math.random()*2) == 0? g = Math.floor(Math.random() * 256) : b = Math.floor(Math.random() * 256)
			break
		case 1:
			g = 255
			
			Math.floor(Math.random()*2) == 0? r = Math.floor(Math.random() * 256) : b = Math.floor(Math.random() * 256)
			break
		case 2:
			b = 255
			
			Math.floor(Math.random()*2) == 0? r = Math.floor(Math.random() * 256) : g = Math.floor(Math.random() * 256)
			break
	}
	
	r *= 16 ** 4
	g *= 16 ** 2
	
	return '#' + (r + g + b).toString(16)
}

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