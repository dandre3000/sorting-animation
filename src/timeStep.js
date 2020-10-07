// import {render} from './render'
import {step} from './step'

// const TARGET_FRAME_RATE = 60
// const UPDATE_INTERVAL = 1000 / TARGET_FRAME_RATE

// let uTime = 0 // update timestamp
let accumulator = 0
let lastTime = 0
let req = 0
export let running = false
let store

export const setStore = s => {
	store = s
}

// frame rate independent loop
export const timeStep = () => {
	const dt = 1000 / store.state.fps
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
	
	req = requestAnimationFrame(timeStep)
	
	const state = store.state
	if (state.sequence.index == state.sequence.length - 1) {
		console.log('stop')
		
		stop()
		state.mainBtn = 2
	}
}

export const start = () => {
	const state = store.state
	
	if (req === 0) {
		if (state.sequence) {
			lastTime = 0
			req = requestAnimationFrame(timeStep)
			running = true
			store.state.mainBtn = 1
		} else {
			console.warn('No-op: array has not been sorted')
		}
	} else {
		throw new Error('timeStep is already running: cannot start another animation frame request')
	}
}

export const stop = () => {
	if (req === 0) {
		console.warn('No-op: timeStep is not running')
	} else {
		cancelAnimationFrame(req)
		req = 0
		running = false
		store.state.mainBtn = 0
	}
}

export { step }