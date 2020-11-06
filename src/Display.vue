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
				$s.commit('canvas', document.querySelector('#array-canvas'))
			})
		}
	}
</script>

<style>
	#array-canvas {
		width: 100%;
	}
</style>
