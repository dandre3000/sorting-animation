import Vue from 'vue'
import App from './App.vue'
import store from './store'

window.addEventListener('DOMContentLoaded', () => {
	const main = new Vue({
		el: '#app',
		store,
		render: h => h(App)
	})
	
	document.querySelectorAll('noscript').forEach(e => {
		e.remove()
	})
	
	window.main = main
})

window.onload = () => {
	
}