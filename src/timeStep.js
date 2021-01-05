// import {render} from './render'
import { update } from './update'

let fps = 60
// const UPDATE_INTERVAL = 1000 / TARGET_FRAME_RATE

// let uTime = 0 // update timestamp
let accumulator = 0
let lastTime = 0
let req = 0
export let running = false

export const setFps = n => {
	fps = n
}

// frame rate independent loop
export const timeStep = () => {
	const dt = 1000 / fps
	let time = window.performance.now()
	let frameTime = lastTime == 0? 0 : time - lastTime
	
	lastTime = time
	
	accumulator += frameTime

	// while loop locked at an exact frame rate
	while (running && accumulator >= dt) {
		update(dt)
		
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
		lastTime = 0
		running = true
		req = requestAnimationFrame(timeStep)
		
		return true
	} else {
		throw new Error('timeStep is already running: cannot start another animation frame request')
	}
}

export const stop = () => {
	if (req === 0) {
		console.warn('No-op: timeStep is not running')
		
		return false
	} else {
		req = 0
		accumulator = 0
		running = false
		
		return true
	}
}