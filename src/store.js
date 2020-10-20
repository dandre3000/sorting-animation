import Vue from 'vue'
import Vuex from 'vuex'
import * as algorithms from './algorithms.js'
import { render } from './render'
import { step } from './step.js'
import { start, stop } from './timeStep.js'

Vue.use(Vuex)

export const state = {
	array: [1, 2, 3, 4, 5],
	sequence: null,
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
	setSequence(state, arr) {
		state.sequence = arr
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
	setCanvas: ({ commit }, canv) => {
		commit('setCanvas', canv)
		render()
	},
	first({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(-99999)
		stop()
	},
	previous({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(-1)
		stop()
	},
	play({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		start()
		// commit('mainBtn', 1)
	},
	pause() {
		stop()
		// commit('mainBtn', 0)
	},
	restart({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(-99999)
		start()
		// commit('mainBtn', 1)
	},
	next({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(1)
		
		const end = state.sequence.index == state.sequence.length - 1
		stop(end)
	},
	last({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(99999)
		stop(true)
	},
	setFps({ commit }, value) {
		commit('setFps', value)
	},
	isDisabled() {
		return state.mainBtn == 1
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