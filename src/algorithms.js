import { SORTED, UNSORTED } from './Bar'

/* const isNumberArray = arr => {
	if (arr instanceof Array == false) return false
	
	for (let i in arr) {
		const v = arr[i]
		
		if (typeof v != 'number') {
			if (typeof v != 'string') {
				return false
			} else if (isNaN(Number(v))) {
				return false
			}
		}
	}
	
	return true
} */

const swap = (arr, idx1, idx2) => {
	if (idx1 == idx2) return
	
	const a = arr[idx1]
	
	arr[idx1] = arr[idx2]
	arr[idx2] = a
}

const cleanArrayClone = (arr) => {
	const copy = [].concat(arr)
	
	copy.forEach(e => {
		e.status = 0
	})
	
	return copy
}

export const bubblesort = (arr, descending) => {
	// if (!isNumberArray(arr)) throw new TypeError('arr must be an array of all numbers')

	const copy = cleanArrayClone(arr)
	
	let swapped = false
	let j = copy.length - 1
	
	const sequence = [{ type: 'genesis' }]
	sequence.index = 0
	
	do {
		swapped = false
		
		if (!descending) {
			for (let i = 0; i < j; i++) {
				const a = copy[i].value
				const b = copy[i + 1].value
				
				sequence.push({ type: 'comparison', index1: i, index2: i + 1 })
				
				if (a > b) {
					swap(copy, i, i + 1)
					swapped = true
					
					sequence.push({ type: 'swap', index1: i, index2: i + 1 })
				}
			}
		} else {
			for (let i = 0; i < j; i++) {
				const a = copy[i].value
				const b = copy[i + 1].value
				
				sequence.push({ type: 'comparison', index1: i, index2: i + 1 })
				
				if (a < b) {
					swap(copy, i, i + 1)
					swapped = true

					sequence.push({ type: 'swap', index1: i, index2: i + 1 })
				}
			}
		}
		
		sequence.push({ type: 'status', idx: j, before: UNSORTED, after: SORTED })
		
		j--
	} while (swapped == true)
	
	sequence.push({ type: 'end' })

	return sequence
}



export const quicksort = (arr, descending) => {
	const copy = cleanArrayClone(arr)
	
	const sequence = [{ type: 'genesis' }]
	sequence.index = 0
	
	/* function altPartition(items, left, right) {
		var pivot   = items[Math.floor((right + left) / 2)], //middle element
			i       = left, //left pointer
			j       = right; //right pointer
		while (i <= j) {
			while (items[i] < pivot) {
				i++;
			}
			while (items[j] > pivot) {
				j--;
			}
			
			sequence.push({ type: 'comparison', index1: i, index2: j, operator: '<=' })
			
			if (i <= j) {
				if (items[i] > items[j]) {
					sequence.push({ type: 'swap', index1: i, index2: j })
					swap(items, i, j); //sawpping two elements
				}

				i++;
				j--;
			}
		}
		return i;
	} */
	
	const partition = (arr, l, r) => {
		if (!descending) {
			const pivot = arr[l].value // 1st element
			let i = l + 1
			
			for (let j = i; j <= r; j++) {
				sequence.push({ type: 'comparison', index1: j, index2: l, operator: '<' })
				
				if (arr[j].value < pivot) {
					sequence.push({ type: 'swap', index1: i, index2: j })
					
					swap(arr, i, j)
					i++
				}
			}
			
			sequence.push({ type: 'swap', index1: l, index2: i - 1 })
			swap(arr, l, i - 1)
			sequence.push({ type: 'status', idx: i - 1, before: UNSORTED, after: SORTED })
			
			return i - 1
		} else {
			const pivot = arr[l].value // 1st element
			let i = l + 1
			
			for (let j = i; j <= r; j++) {
				sequence.push({ type: 'comparison', index1: j, index2: l, operator: '>' })
				
				if (arr[j].value > pivot) {
					sequence.push({ type: 'swap', index1: i, index2: j })
					
					swap(arr, i, j)
					i++
				}
			}
			
			sequence.push({ type: 'swap', index1: l, index2: i - 1 })
			swap(arr, l, i - 1)
			sequence.push({ type: 'status', idx: i - 1, before: UNSORTED, after: SORTED })
			
			return i - 1
		}
	}

	/* function sort(items, left, right) {
		var index;
		if (items.length > 1) {
			index = partition(items, left, right); //index returned from partition
			if (left < index - 1) { //more elements on the left side of the pivot
				sort(items, left, index - 1);
			}
			if (index < right) { //more elements on the right side of the pivot
				sort(items, index, right);
			}
		}
		return items;
	} */
	
	const sort = (arr, l, r) => {
		if (l < r) {
			const p = partition(arr, l, r); //index returned from partition
			sort(arr, l, p - 1)
			sort(arr, p + 1, r)
		} else if (l == r) {
			sequence.push({ type: 'status', idx: l, before: UNSORTED, after: SORTED })
		}
		
		return arr;
	}
	
	sort(copy, 0, copy.length - 1)
	
	sequence.push({ type: 'end' })
	
	return sequence
}

export const insertionsort = (arr, descending) => {
	const copy = cleanArrayClone(arr)
	
	const sequence = [{ type: 'genesis' }]
	sequence.index = 0
	
	if (!descending) {
		for (let i = 1; i < copy.length; i++) {
			for (let j = i; j > 0 && copy[j - 1].value > copy[j].value; j--) {
				sequence.push({ type: 'comparison', index1: j - 1, index2: j, operator: '>' })
				
				sequence.push({ type: 'swap', index1: j - 1, index2: j })
					
				swap(copy, j, j - 1)
				
				sequence.push({ type: 'status', idx: j - 1, before: UNSORTED, after: SORTED })
			}
		}
	} else {
		for (let i = 1; i < copy.length; i++) {
			for (let j = i; j > 0 && copy[j - 1].value < copy[j].value; j--) {
				sequence.push({ type: 'comparison', index1: j - 1, index2: j, operator: '<' })
				
				sequence.push({ type: 'swap', index1: j - 1, index2: j })
					
				swap(copy, j, j - 1)
				
				sequence.push({ type: 'status', idx: j - 1, before: UNSORTED, after: SORTED })
			}
		}
	}
	
	sequence.push({ type: 'end' })
	
	return sequence
}

export const selectionsort = (arr, descending) => {
	const copy = cleanArrayClone(arr)
	
	const sequence = [{ type: 'genesis' }]
	sequence.index = 0
	
	for (let i = 0; i < copy.length - 1; i++) {
		let min = i
		
		if (!descending) {
			for (let j = i + 1; j < copy.length; j++) {
				sequence.push({ type: 'comparison', index1: j, index2: min, operator: '<' })
				
				if (copy[j].value < copy[min].value) {
					min = j
				}
			}
		} else {
			for (let j = i + 1; j < copy.length; j++) {
				sequence.push({ type: 'comparison', index1: j, index2: min, operator: '>' })
				
				if (copy[j].value > copy[min].value) {
					min = j
				}
			}

		}
		
		sequence.push({ type: 'swap', index1: i, index2: min })
		
		swap(copy, i, min)
		
		sequence.push({ type: 'status', idx: i, before: UNSORTED, after: SORTED })
	}
	
	sequence.push({ type: 'end' })
	
	return sequence
}