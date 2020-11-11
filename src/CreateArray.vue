<template>
	<div>
		<div class='row'>
			<input id='length' @input="setLength" type="range" min="1" max="100" value="50" class="slider"><p>Length: {{ length }}</p>
			<input id='max' @input="setMax" type="range" min="2" max="200" value="50" class="slider"><p>Max: {{ max }}<span id='max-display'></span></p>
			<button @click='randomArray'>Create Array</button>
		</div>
		<div class='row'>
			<input id='input' type='text'><button @click='readInput'>Enter</button>
		</div>
	</div>
</template>

<script>
	import { Bar, randomArray } from './Bar'
	import { running } from './timeStep'
	
	export default {
		data() {
			return {
				length: 50,
				max: 50
			}
		},
		methods: {
			readInput() {
				const { commit, dispatch } = this.$store
				
				dispatch('pause')
				commit('array', document.querySelector('#input').value.split(',').map(x => new Bar(Number(x))))
				commit('animation')
				commit('control', 0)
				dispatch('render')
			},
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
				commit('control', 0)
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
