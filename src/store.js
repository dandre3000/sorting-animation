import Vue from 'vue'
import Vuex from 'vuex'
import * as algorithms from './algorithms.js'
import { render } from './render'
import { step } from './step.js'
import { start, stop } from './timeStep.js'

Vue.use(Vuex)

export const state = {
	array: [],
	sequence: [],
	canvas: null,
	sort: algorithms['quicksort'],
	mainBtn: 0,
	fps: 60,
	descending: false
}

const mutations = {
	setArray(state, arr) {
		state.array = arr
	},
	setSequence(state) {
		state.sequence = state.sort(state.array, state.descending)
	},
	setCanvas(state, canv) {
		state.canvas = canv
	},
	setSort(state, name) {
		state.sort = algorithms[name]
	},
	setFps(state, n) {
		state.fps = n
	},
	mainBtn(state, n) {
		state.mainBtn = n
	},
	toggleDescending(state) {
		state.descending = !state.descending
	}
}

const actions = {
	setArray({ commit }, arr) {
		commit('setArray', arr)
		render()
	},
	setSequence({ commit }, arr) {
		commit('setArray', arr)
		commit('setSequence')
		render()
	},
	setCanvas: ({ commit }, canv) => {
		commit('setCanvas', canv)
		// render()
	},
	first() {
		step(-99999)
		stop()
	},
	previous() {
		step(-1)
		stop()
	},
	play() {
		start()
	},
	pause() {
		stop()
	},
	restart() {
		step(-99999)
		start()
	},
	next() {
		step(1)
		
		const end = state.sequence.index == state.sequence.length - 1
		stop(end)
	},
	last() {
		step(99999)
		stop(true)
	},
	setFps({ commit }, value) {
		commit('setFps', value)
	},
	toggleDescending({ commit }) {
		commit('toggleDescending')
		commit('setSequence', state.sort(state.array, state.descending))
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