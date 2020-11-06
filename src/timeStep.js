// import {render} from './render'
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
		store.state.reverse? store.dispatch('previous') : store.dispatch('next')
		
		accumulator -= dt
		// uTime += dt
	}
	
	if (running) {
		req = requestAnimationFrame(timeStep)
	} else {
		cancelAnimationFrame(req)
	}
}

export const start = () => {
	if (!running) {
		if (!(!store.state.reverse && store.state.animation.currentIdx == store.state.animation.frames.length - 1) && !(store.state.reverse && store.state.animation.currentIdx == 0)) {
			lastTime = 0
			running = true
			req = requestAnimationFrame(timeStep)
			store.commit('control', 1)
		}
	} else {
		throw new Error('timeStep is already running: cannot start another animation frame request')
	}
}

export const stop = () => {
	if (req === 0) {
		console.warn('No-op: timeStep is not running')
	} else {
		req = 0
		running = false
		store.commit('control', 0)
	}
}