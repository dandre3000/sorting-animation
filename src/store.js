import Vue from 'vue'
import Vuex from 'vuex'
import { render } from './render'
import { start, stop } from './timeStep'
import * as algorithms from './algorithms'

Vue.use(Vuex)

const PAUSE = 0
// const PLAY = 1

export const state = {
	array: null,
	canvas: null,
	animation: null,
	fps: 60,
	control: PAUSE,
	descending: false,
	reverse: false,
	sort: ''
}

const mutations = {
	array(state, array) {
		state.array = array
	},
	canvas(state, canvas) {
		state.canvas = canvas
	},
	animation(state, name = state.sort) {
		state.sort = name
		state.animation = algorithms[name](state.array, state.descending)
	},
	control(state, v) {
		state.control = v
	},
	descending(state) {
		state.descending = !state.descending
	},
	reverse(state) {
		state.reverse = !state.reverse
	},
	fps(state, v) {
		state.fps = v
	}
}

const actions = {
	array({ commit }, array) {
		commit('array', array)
		render(state)
	},
	first() {
		state.animation.firstFrame()
		render(state)
	},
	previous() {
		state.animation.previousFrame()
		render(state)
	},
	play() {
		start()
	},
	pause() {
		stop()
	},
	end({ commit }) {
		stop()
		commit('control', 2)
	},
	restart() {
		actions.first()
		start()
	},
	next() {
		state.animation.nextFrame()
		render(state)
	},
	last() {
		state.animation.lastFrame()
		render(state)
	},
	render() {
		render(state)
	},
	toggleDescending({ commit }) {
		commit('descending')
		commit('animation')
		if (state.control == 2) commit('control', 0)
	}
}

const getters = {
	
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})