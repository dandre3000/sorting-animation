import { swap } from './algorithms'
import store from './store'

export const step = n => {
	const sequence = store.state.sequence
	if (sequence.length < 1) {
		return
	}
	
	const tmpArray = [...store.state.array]
	
	let i = sequence.index
	let target = i + n
	
	if (target < 0) {
		target = 0
	} else  if (target > sequence.length - 1) {
		target = sequence.length - 1
	}
	
	while (i != target) {
		if (n < 0) { // reverse
			if (sequence[i].type == 'swap') { // two swaps cancel each other
				let {index1, index2} = sequence[i]
				
				swap(tmpArray, index1, index2)
				sequence.swaps--
			} else if (sequence[i].type == 'splice') {
				let {index1, index2} = sequence[i]
				let t = tmpArray.splice(index2, 1)[0]
				tmpArray.splice(index1, 0, t)
				sequence.swaps--
			} else if (sequence[i].type == 'comparison') {
				sequence.comparisons--
			}
			
			if (sequence[i].status) {
				tmpArray[sequence[i].status.index].status = sequence[i].status.before
			}
			
			i--
		} else if (n > 0) {
			i++
			
			if (sequence[i].type == 'swap') {
				let {index1, index2} = sequence[i]
				
				swap(tmpArray, index1, index2)
				sequence.swaps++
			} else if (sequence[i].type == 'splice') {
				let {index1, index2} = sequence[i]
				let t = tmpArray.splice(index1, 1)[0]
				tmpArray.splice(index2, 0, t)
				sequence.swaps++
			} else if (sequence[i].type == 'comparison') {
				sequence.comparisons++
			}
			
			if (sequence[i].status) {
				tmpArray[sequence[i].status.index].status = sequence[i].status.after
			}
		}
		
		sequence.index = i
	}
	
	store.dispatch('setArray', tmpArray)
}