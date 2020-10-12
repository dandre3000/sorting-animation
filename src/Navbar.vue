<template>
	<div>
		<nav class='navbar navbar-expand-sm bg-dark'>
			<span class="navbar-brand">Expand at sm</span>
			<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Algorithms
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<a class="dropdown-item" href="#" @click="setSort('bubblesort')">Bubblesort</a>
					<a class="dropdown-item" href="#" @click="setSort('quicksort')">Quicksort</a>
					<a class="dropdown-item" href="#" @click="setSort('insertionsort')">Insertionsort</a>
					<a class="dropdown-item" href="#" @click="setSort('selectionsort')">Selectionsort</a>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	
	export default {
		methods: {
			setSort(name) {
				this.$store.commit('setSort', name)
				this.$store.commit('setSequence', this.$store.state.sort(this.$store.state.array, this.$store.state.descending))
			}
		}
	}
</script>

<style>
	
</style>
