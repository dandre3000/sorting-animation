import store from './store'

const swap = (arr, idx1, idx2) => {
	const a = arr[idx1]
	const b = arr[idx2]
	
	arr[idx2] = a
	arr[idx1] = b
}

export const step = n => {
	const sequence = store.state.sequence
	if (!sequence) {
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
		if (n < 0) {
			if (sequence[i].type == 'swap') {
				let {index1, index2} = sequence[i]
				
				swap(tmpArray, index1, index2)
			}
			
			i--
		} else if (n > 0) {
			i++
			
			if (sequence[i].type == 'swap') {
				let {index1, index2} = sequence[i]
				
				swap(tmpArray, index1, index2)
			}
		}
		
		sequence.index = i
	}
	
	store.dispatch('setArray', tmpArray)
}