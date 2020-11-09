export const render = ({ array, canvas, animation }) => {
	if (!canvas) return
	
	const ctx = canvas.getContext('2d')
	
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	if (canvas && animation) {
		array.forEach((bar, i) => {
			bar.render(array.length, i, canvas, animation)
		})
	}
}