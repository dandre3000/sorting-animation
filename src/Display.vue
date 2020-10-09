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
	import { start, stop, setStore, step } from './timeStep.js'
	
	export default {
		methods: {
			first() {
				const $s = this.$store
				
				if (!$s.state.sequence) {
					$s.commit('setSequence', $s.state.sort($s.state.array, $s.state.descending))
				}
				
				step(-99999)
				$s.commit('mainBtn', 0)
			},
			previous() {
				const $s = this.$store
				
				if (!$s.state.sequence) {
					$s.commit('setSequence', $s.state.sort($s.state.array, $s.state.descending))
				}
				
				step(-1)
				$s.commit('mainBtn', 0)
			},
			play() {
				const $s = this.$store
				
				if ($s.state.mainBtn == 1) {
					stop()
					// e.firstChild.src = 'assets/images/play.png'
				} else if ($s.state.mainBtn == 0) {
					if (!$s.state.sequence) {
						$s.commit('setSequence', $s.state.sort($s.state.array, $s.state.descending))
					}
					
					start()
					// e.firstChild.src = 'assets/images/pause.png'
				} else {
					if (!$s.state.sequence) {
						$s.commit('setSequence', $s.state.sort($s.state.array, $s.state.descending))
					}
					
					step(-99999)
					start()
				}
			},
			next() {
				const $s = this.$store
				
				if (!$s.state.sequence) {
					$s.commit('setSequence', $s.state.sort($s.state.array, $s.state.descending))
				}
				
				step(1)
				
				if ($s.state.sequence.index == $s.state.sequence.length - 1) {
					$s.commit('mainBtn', 2)
				}
			},
			last() {
				const $s = this.$store
				
				if (!$s.state.sequence) {
					$s.commit('setSequence', $s.state.sort($s.state.array, $s.state.descending))
				}
				
				step(99999)
				$s.commit('mainBtn', 2)
			},
			setFps() {
				this.$store.commit('setFps', document.querySelector('#fps').value)
			},
			isDisabled() {
				return this.$store.state.mainBtn == 1
			},
			toggleDescending() {
				this.$store.commit('toggleDescending')
			}
		},
		mounted: function () {
			const $s = this.$store
			
			this.$nextTick(function () {
				$s.dispatch('setCanvas', document.querySelector('#array-display'))
			})
			
			setStore($s)
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
