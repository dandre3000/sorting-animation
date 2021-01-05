<template>
	<div>
		<canvas id='array-canvas'></canvas>
	</div>
</template>

<script>
	export default {
		mounted: function () {
			const $s = this.$store
			
			this.$nextTick(() => {
				const canv = document.querySelector('#array-canvas')
				
				const canvasResize = () => {
					canv.width = canv.clientWidth
					canv.height = 9/16 * canv.width
					this.$store.dispatch('render')
				}
				
				window.onresize = e => {
					canvasResize()
				}
				$s.commit('canvas', canv)
				
				canvasResize()
			})
		}
	}
</script>

<style>
	#array-canvas {
		width: 100%;
	}
</style>
