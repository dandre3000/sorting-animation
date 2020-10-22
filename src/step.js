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
			let {index1, index2} = sequence[i] // two swaps cancel each other
			switch (sequence[i].type) {
				case 'swap':
					swap(tmpArray, index1, index2)
					sequence.swaps--
					break
				case 'splice':
					tmpArray.splice(index1, 0, tmpArray.splice(index2, 1)[0])
					sequence.swaps--
					break
				case 'comparison':
					sequence.comparisons--
					break
				case 'split':
					tmpArray.forEach(bar => {
						bar.status = sequence[i].before
					})
			}
			
			if (sequence[i].status) {
				tmpArray[sequence[i].status.index].status = sequence[i].status.before
			}
			
			i--
		} else if (n > 0) {
			i++
			
			let {index1, index2} = sequence[i]
			switch (sequence[i].type) {
				case 'swap':
					swap(tmpArray, index1, index2)
					sequence.swaps++
					break
				case 'splice':
					tmpArray.splice(index2, 0, tmpArray.splice(index1, 1)[0])
					sequence.swaps++
					break
				case 'comparison':
					sequence.comparisons++
					break
				case 'split':
					tmpArray.forEach((bar, j) => {
						bar.status = sequence[i].colors[j]
					})
			}
			
			if (sequence[i].status) {
				tmpArray[sequence[i].status.index].status = sequence[i].status.after
			}
		}
		
		sequence.index = i
	}
	
	store.dispatch('setArray', tmpArray)
}