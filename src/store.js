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
		commit('mainBtn', 0)
	},
	previous({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(-1)
		commit('mainBtn', 0)
	},
	play({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		start()
	},
	pause() {
		stop()
	},
	restart({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(-99999)
		start()
	},
	next({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(1)
		
		if (state.sequence.index == state.sequence.length - 1) {
			commit('mainBtn', 2)
		}
	},
	last({ commit }) {
		if (!state.sequence) {
			commit('setSequence', state.sort(state.array, state.descending))
		}
		
		step(99999)
		commit('mainBtn', 2)
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