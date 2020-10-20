// import {render} from './render'
import { step } from './step'
import store from './store'

// const TARGET_FRAME_RATE = 60
// const UPDATE_INTERVAL = 1000 / TARGET_FRAME_RATE

// let uTime = 0 // update timestamp
let accumulator = 0
let lastTime = 0
let req = 0
export let running = false

// frame rate independent loop
export const timeStep = () => {
	const state = store.state
	const dt = 1000 / state.fps
	let time = window.performance.now()
	let frameTime = lastTime == 0? 0 : time - lastTime
	
	lastTime = time
	
	accumulator += frameTime

	// while loop locked at an exact frame rate
	while (accumulator >= dt) {
		step(/* uTime, dt,  */1)
		
		accumulator -= dt
		// uTime += dt
	}
	
	// render()
	
	if (state.mainBtn == 1 && state.sequence.index == state.sequence.length - 1) {
		stop(true)
	} else {
		req = requestAnimationFrame(timeStep)
	}
	
}

export const start = () => {
	if (req === 0) {
		lastTime = 0
		req = requestAnimationFrame(timeStep)
		running = true
		store.commit('mainBtn', 1)
	} else {
		throw new Error('timeStep is already running: cannot start another animation frame request')
	}
}

export const stop = (end = false) => {
	if (req === 0) {
		console.warn('No-op: timeStep is not running')
	} else {
		cancelAnimationFrame(req)
		req = 0
		running = false
	}
	
	if (end) {
		store.commit('mainBtn', 2)
	} else {
		store.commit('mainBtn', 0)
	}
}