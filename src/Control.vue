<template>
	<div>
		<button id='first' @click='first'><img src='assets/images/first.png'></button>
		<button id='previous' @click='previous'><img src='assets/images/previous.png'></button>
		<button id='play' @click='play' v-if='this.$store.state.control == 0'><img src='assets/images/play.png'></button>
		<button id='pause' @click='pause' v-else-if='this.$store.state.control == 1'><img src='assets/images/pause.png'></button>
		<button id='restart' @click='restart' v-else><img src='assets/images/restart.png'></button>
		<button id='next' @click='next'><img src='assets/images/next.png'></button>
		<button id='last' @click='last'><img src='assets/images/last.png'></button>
		<input id='descending' @input="toggleDescending" type="checkbox"><label for="descending">Descending</label>
		<input id='reverse' @input="toggleReverse" type="checkbox"><label for="reverse">Reverse</label>
		<input id='fps' @input="setFps" type="range" min="1" max="60" value="60" class="slider"><p>Fps: {{ this.$store.state.fps }}</p>
	</div>
</template>

<script>
	import './assets/pause.png'
	import './assets/play.png'
	import './assets/restart.png'
	import './assets/previous.png'
	import './assets/next.png'
	import './assets/first.png'
	import './assets/last.png'
	
	export default {
		methods: {
			play() {
				this.$store.dispatch('play')
			},
			pause() {
				this.$store.dispatch('pause')
			},
			restart() {
				this.$store.dispatch('restart')
			},
			previous() {
				this.$store.dispatch('previous')
			},
			next() {
				this.$store.dispatch('next')
			},
			first() {
				this.$store.dispatch('first')
			},
			last() {
				this.$store.dispatch('last')
			},
			toggleDescending() {
				this.$store.dispatch('toggleDescending')
			},
			toggleReverse() {
				this.$store.commit('reverse')
			},
			setFps() {
				this.$store.commit('fps', document.querySelector('#fps').value)
			}
		},
		mounted: function () {
			const $s = this.$store
			
			this.$nextTick(() => {
			})
		}
	}
</script>

<style>
	#array-canvas {
		width: 100%;
	}
</style>
