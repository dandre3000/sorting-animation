import Vue from 'vue'
import App from './App.vue';
import store from './store'
// import './style.css' // extract css

import './assets/play.png'
import './assets/pause.png'
import './assets/restart.png'
import './assets/next.png'
import './assets/previous.png'
import './assets/first.png'
import './assets/last.png'

window.addEventListener('DOMContentLoaded', () => {
	const main = new Vue({
		el: '#app',
		store,
		render: h => h(App)
	})
	
	document.querySelectorAll('noscript').forEach(e => {
		e.remove()
	})
	
	window.App = App
	window.main = main
})