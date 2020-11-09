<template>
	<div>
		<nav class='navbar navbar-expand-sm bg-dark'>
			<span class="navbar-brand">Expand at sm</span>
			<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Algorithms
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<a class="dropdown-item" href="#" @click="sort('bubblesort')">Bubblesort</a>
					<a class="dropdown-item" href="#" @click="sort('selectionsort')">Selectionsort</a>
					<a class="dropdown-item" href="#" @click="sort('insertionsort')">Insertionsort</a>
					<a class="dropdown-item" href="#" @click="sort('quicksort')">Quicksort</a>
					<a class="dropdown-item" href="#" @click="sort('mergesort')">Mergesort</a>
					<a class="dropdown-item" href="#" @click="sort('randomquicksort')">Random Quicksort</a>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		methods: {
			sort(name) {
				this.$store.commit('animation', name)
			}
		}
	}
</script>

<style>
	
</style>
