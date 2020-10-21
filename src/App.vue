<template>
	<div>
		<Navbar></Navbar>
		<div class='container'>
			<div class='row'>
				<input id='input' type='text'><button @click='readInput'>Enter</button>
			</div>
			<div class='row'>
				<input id='length' @input="setLength" type="range" min="1" max="100" value="50" class="slider"><p>Length: {{ length }}</p>
				<input id='max' @input="setMax" type="range" min="1" max="100" value="50" class="slider"><p>Max: {{ max }}<span id='max-display'></span></p>
				<button @click='randomArray'>Create Array</button>
			</div>
			<br>
			<Display></Display>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import Navbar from './Navbar.vue'
	import Display from './Display.vue'
	import { Bar } from './Bar.js'
	
	export default {
		components: {
			Navbar,
			Display
		},
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
				dispatch('setSequence', document.querySelector('#input').value.split(',').map(x => new Bar(x)))
			},
			setLength() {
				this.length = document.querySelector('#length').value * 1
			},
			setMax() {
				this.max = document.querySelector('#max').value * 1
			},
			randomArray() {
				const { commit, dispatch, state } = this.$store
				const arr = new Array(this.length).fill(1)
				
				for (let i in arr) {
					arr[i] = new Bar(Math.ceil(Math.random() * this.max))
				}
				
				dispatch('pause')
				dispatch('setSequence', arr)
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				// Code that will run only after the
				// entire view has been rendered
				document.querySelector('#input').value = '9, 8, 7, 6, 5, 4, 3, 2, 1, 0'
				// this.readInput()
				
				this.setLength()
				this.setMax()
				this.randomArray()
			})
		}
	}
</script>

<style>
	body {
		background-color: var(--gray);
		font-family: Arial, sans-serif;
	}
</style>
