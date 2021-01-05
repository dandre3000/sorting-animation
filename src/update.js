import store from './store'

export const update = () => {
	if (store.state.reverse) {
		store.dispatch('previous')
		store.dispatch('array', store.state.animation.currentFrame)
		
		if (store.state.reverse && store.state.animation.currentIdx == 0) {
			store.dispatch('pause')
		}
		
		if (store.state.control == 2) {
			store.commit('control', 0)
		}
	} else {
		store.dispatch('next')
		store.dispatch('array', store.state.animation.currentFrame)
		
		if (!store.state.reverse && store.state.animation.currentIdx == store.state.animation.frames.length - 1) {
			store.dispatch('end')
		}
	}
}