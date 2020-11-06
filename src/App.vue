<template>
	<div class='container'>
		<Navbar></Navbar>
		<CreateArray></CreateArray>
		<Display></Display>
		<Control></Control>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import Display from './Display.vue'
	import CreateArray from './CreateArray.vue'
	import Control from './Control.vue'
	import Navbar from './Navbar.vue'
	import { randomArray } from './Bar'
	
	export default {
		components: {
			CreateArray,
			Display,
			Control,
			Navbar
		},
		methods: {
		},
		mounted: function () {
			this.$nextTick(() => {
				this.$store.commit('array', randomArray())
				this.$store.commit('animation', 'bubblesort')
				this.$store.dispatch('render')
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
