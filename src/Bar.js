export const Bar = class {
	constructor(value, color = 'white') {
		this.value = value
		this.color = color
	}
	
	render(array, idx, canvas) {
		const ctx = canvas.getContext('2d')
		const w = canvas.width / (array.length * 2)
		
		ctx.fillStyle = this.color
		
		let max = 0
		if (array) {
			if (array instanceof Array) {
				for (let i in array) {
					if (array[i].value > max) max = array[i].value
				}
			}
		}
		
		ctx.fillRect(idx * w * 2 + w / 2, canvas.height, w, -(this.value / max) * canvas.height)
	}
}

export const newBarArray = array => {
	const result = []
	array.forEach(v => {
		result.push(new Bar(v))
	})
	
	return result
}

export const randomArray = (length = 50, max = 50) => {
	const array = new Array(length).fill(1)
	
	for (let i in array) {
		array[i] = new Bar(Math.ceil(Math.random() * max))
	}
	
	return array
}