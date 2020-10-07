<template>
	<div>
		<canvas id='array-display'></canvas>
		<div>
			<button @click='first' :disabled='isDisabled()'><img src='assets/images/first.png'></button>
			<button @click='previous' :disabled='isDisabled()'><img src='assets/images/previous.png'></button>
			<button id='play' @click='play'>
				<img src='assets/images/play.png' v-if="this.$store.state.mainBtn == 0">
				<img src='assets/images/pause.png' v-else-if="this.$store.state.mainBtn == 1">
				<img src='assets/images/restart.png' v-else>
			</button>
			<button @click='next' :disabled='isDisabled()'><img src='assets/images/next.png'></button>
			<button @click='last' :disabled='isDisabled()'><img src='assets/images/last.png'></button>
		</div>
		<div class='row'>
			<input id='fps' @input="setFps" type="range" min="1" max="60" value="60" class="slider"><p>Fps: {{ $store.state.fps }}</p>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { bubbleSort } from './algorithms.js'
	import { start, stop, setStore, step } from './timeStep.js'
	
	export default {
		methods: {
			first() {
				if (!this.$store.state.sequence) {
					this.$store.commit('setSequence', this.$store.state.sort(this.$store.state.array))
				}
				
				step(-99999)
				this.$store.commit('mainBtn', 0)
			},
			previous() {
				if (!this.$store.state.sequence) {
					this.$store.commit('setSequence', this.$store.state.sort(this.$store.state.array))
				}
				
				step(-1)
				this.$store.commit('mainBtn', 0)
			},
			play() {
				if (this.$store.state.mainBtn == 1) {
					stop()
					// e.firstChild.src = 'assets/images/play.png'
				} else if (this.$store.state.mainBtn == 0) {
					if (!this.$store.state.sequence) {
						this.$store.commit('setSequence', this.$store.state.sort(this.$store.state.array))
					}
					
					start()
					// e.firstChild.src = 'assets/images/pause.png'
				} else {
					if (!this.$store.state.sequence) {
						this.$store.commit('setSequence', this.$store.state.sort(this.$store.state.array))
					}
					
					step(-99999)
					start()
				}
			},
			next() {
				if (!this.$store.state.sequence) {
					this.$store.commit('setSequence', this.$store.state.sort(this.$store.state.array))
				}
				
				step(1)
				
				if (this.$store.state.sequence.index == this.$store.state.sequence.length - 1) {
					this.$store.commit('mainBtn', 2)
				}
			},
			last() {
				if (!this.$store.state.sequence) {
					this.$store.commit('setSequence', this.$store.state.sort(this.$store.state.array))
				}
				
				step(99999)
				this.$store.commit('mainBtn', 2)
			},
			setFps() {
				this.$store.commit('setFps', document.querySelector('#fps').value)
			},
			isDisabled() {
				return this.$store.state.mainBtn == 1
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				this.$store.dispatch('setCanvas', document.querySelector('#array-display'))
			})
			
			setStore(this.$store)
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
