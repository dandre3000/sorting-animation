import Vue from 'vue'
import Vuex from 'vuex'
import * as algorithms from './algorithms.js'
import { render } from './render'

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