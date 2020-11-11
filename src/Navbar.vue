<template>
		<nav class='navbar navbar-expand-sm navbar-light bg-light'>
			<span class="navbar-brand">Algorithms</span>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class='nav-item'><a class='nav-link' href="#" @click="sort('bubblesort')">Bubblesort</a></li>
					<li class='nav-item'><a class='nav-link' href="#" @click="sort('selectionsort')">Selectionsort</a></li>
					<li class='nav-item'><a class='nav-link' href="#" @click="sort('insertionsort')">Insertionsort</a></li>
					<li class='nav-item'><a class='nav-link' href="#" @click="sort('quicksort')">Quicksort</a></li>
					<li class='nav-item'><a class='nav-link' href="#" @click="sort('randomquicksort')">Random Quicksort</a></li>
					<li class='nav-item'><a class='nav-link' href="#" @click="sort('mergesort')">Mergesort</a></li>
				</ul>
			</div>
		</nav>
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
