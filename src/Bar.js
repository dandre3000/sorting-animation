export const Bar = class {
	constructor(value, color = 'white') {
		this.value = value
		this.color = color
	}
	
	render(arrayLength, idx, canvas, animation) {
		const ctx = canvas.getContext('2d')
		const w = canvas.width / (arrayLength * 2)
		
		ctx.fillStyle = this.color
		
		if (animation) {
			if (animation.currentFrame instanceof Array) {
				animation.currentFrame.forEach(data => {
					const { index, tmpColor } = data
					
					if (index == idx) {
						if (tmpColor) ctx.fillStyle = tmpColor
					}
				})
			}
		}
		
		ctx.fillRect(idx * w * 2 + w / 2, canvas.height, w, -this.value * (canvas.height / 100))
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