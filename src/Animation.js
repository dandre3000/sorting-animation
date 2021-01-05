import store from './store'

export const Animation = class {
	constructor() {
		this.frames = [store.state.array]
		this.currentIdx = 0
		this.currentFrame = null
		this.sortedArray = null
	}
	
	addFrame(arr) {
		this.frames.push([].concat(arr))
	}
	
	nextFrame() {
		if (this.currentIdx == this.frames.length - 1) return
		
		this.currentFrame = this.frames[++this.currentIdx]
	}
	
	previousFrame() {
		if (this.currentIdx == 0) return
		
		this.currentFrame = this.frames[--this.currentIdx]
	}
	
	firstFrame() {
		this.currentIdx = 1
		this.previousFrame()
	}
	
	lastFrame() {
		this.currentIdx = this.frames.length - 2
		this.nextFrame()
	}
}