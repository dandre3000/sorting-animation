<template>
	<div>
		<canvas id='array-display'></canvas>
		<div>
			<p>{{ $store.state.sort.name }}</p>
			<button @click='first'><img src='assets/images/first.png'></button>
			<button @click='previous'><img src='assets/images/previous.png'></button>
			<button id='play' @click='play'>
				<img src='assets/images/play.png' v-if="this.$store.state.mainBtn == 0">
				<img src='assets/images/pause.png' v-else-if="this.$store.state.mainBtn == 1">
				<img src='assets/images/restart.png' v-else>
			</button>
			<button @click='next'><img src='assets/images/next.png'></button>
			<button @click='last'><img src='assets/images/last.png'></button>
			<input id='descending' @input="toggleDescending" type="checkbox"><label for="descending">Descending</label>
		</div>
		<div class='row'>
			<input id='fps' @input="setFps" type="range" min="1" max="60" value="60" class="slider"><p>Fps: {{ $store.state.fps }}</p>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { bubbleSort } from './algorithms.js'
	import { start, stop, step } from './timeStep.js'
	
	export default {
		methods: {
			first() {
				this.$store.dispatch('first')
			},
			previous() {
				this.$store.dispatch('previous')
			},
			play() {
				if (this.$store.state.mainBtn == 1) {
					this.$store.dispatch('pause')
				} else if (this.$store.state.mainBtn == 0) {
					this.$store.dispatch('play')
				} else {
					this.$store.dispatch('restart')
				}
			},
			next() {
				this.$store.dispatch('next')
			},
			last() {
				this.$store.dispatch('last')
			},
			setFps() {
				this.$store.dispatch('setFps', document.querySelector('#fps').value)
			},
			toggleDescending() {
				this.$store.dispatch('toggleDescending')
			}
		},
		mounted: function () {
			const $s = this.$store
			
			this.$nextTick(function () {
				$s.commit('setCanvas', document.querySelector('#array-display'))
			})
			
			window.display = this
		}
	}
</script>

<style>
	#array-display {
		width: 100%;
	}
	button:disabled {
		background-color: black;
	}
</style>
