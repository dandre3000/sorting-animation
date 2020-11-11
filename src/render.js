export const render = ({ array, canvas }) => {
	if (!canvas) return
	
	const ctx = canvas.getContext('2d')
	
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	if (canvas && array) {
		array.forEach((bar, i) => {
			bar.render(array, i, canvas)
		})
	}
}