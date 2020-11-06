<template>
	<div class='row'>
		<input id='length' @input="setLength" type="range" min="1" max="100" value="50" class="slider"><p>Length: {{ length }}</p>
		<input id='max' @input="setMax" type="range" min="1" max="100" value="50" class="slider"><p>Max: {{ max }}<span id='max-display'></span></p>
		<button @click='randomArray'>Create Array</button>
	</div>
</template>

<script>
	import { randomArray } from './Bar'
	
	export default {
		data() {
			return {
				length: 50,
				max: 50
			}
		},
		methods: {
			setLength() {
				this.length = document.querySelector('#length').value * 1
			},
			setMax() {
				this.max = document.querySelector('#max').value * 1
			},
			randomArray() {
				const { commit, dispatch } = this.$store
				const arr = randomArray(this.length, this.max)
				
				dispatch('pause')
				commit('array', arr)
				commit('animation')
				dispatch('render')
			}
		},
		mounted: function () {
			// this.randomArray()
		}
	}
</script>

<style>
	#array-canvas {
		width: 100%;
	}
</style>
