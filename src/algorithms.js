import { Animation } from './Animation'
import { Bar } from './Bar'

export const swap = (arr, idx1, idx2) => {
	if (idx1 == idx2) return
	
	const a = arr[idx1]
	
	arr[idx1] = arr[idx2]
	arr[idx2] = a
}

export const bubblesort = (arr, descending) => {
	const copy = [].concat(arr)
	copy.forEach(bar => {
		bar.color = 'white'
	})
		
	const anim = new Animation()
	
	let swapped = false
	let j = copy.length - 1
	
	do {
		swapped = false
		
		for (let i = 0; i < j; i++) {
			const a = copy[i].value
			const b = copy[i + 1].value
			
			copy[i] = new Bar(copy[i].value, 'red')
			copy[i + 1] = new Bar(copy[i + 1].value, 'blue')
			
			anim.addFrame(copy)
			
			if (descending && a < b || !descending && a > b) {
				swap(copy, i, i + 1)
				
				anim.addFrame(copy)
				
				swapped = true
			}
			
			copy[i] = new Bar(copy[i].value)
			copy[i + 1] = new Bar(copy[i + 1].value)
		}
		
		copy[j] = new Bar(copy[j].value, 'green')
		
		j--
	} while (swapped == true)
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value, 'green')
	})
	anim.addFrame(copy)
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value)
	})
	
	return anim
}

export const selectionsort = (arr, descending) => {
	const copy = [].concat(arr)
	copy.forEach(bar => {
		bar.color = 'white'
	})
	
	const anim = new Animation()
	
	for (let i = 0; i < copy.length - 1; i++) {
		let min = i
		
		for (let j = i + 1; j < copy.length; j++) {
			copy[j] = new Bar(copy[j].value, 'red')
			copy[min] = new Bar(copy[min].value, 'blue')
			anim.addFrame(copy)
			
			copy[min] = new Bar(copy[min].value)
			copy[j] = new Bar(copy[j].value)
			
			if (!descending && copy[j].value < copy[min].value || descending && copy[j].value > copy[min].value) {
				min = j
			} else {
				copy[j] = new Bar(copy[j].value)
			}
		}
		
		if (i !== min) {
			copy[i] = new Bar(copy[i].value, 'red')
			copy[min] = new Bar(copy[min].value, 'blue')
			anim.addFrame(copy)
			
			swap(copy, i, min)
			anim.addFrame(copy)
		}
		
		copy[i] = new Bar(copy[i].value, 'green')
		copy[min] = new Bar(copy[min].value)
	}
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value, 'green')
	})
	anim.addFrame(copy)
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value)
	})
	
	return anim
}

export const insertionsort = (arr, descending) => {
	const copy = [].concat(arr)
	copy.forEach(bar => {
		bar.color = 'white'
	})
	
	const anim = new Animation()
	
	copy[0] = new Bar(copy[0].value, 'green')
	anim.addFrame(copy)
	
	for (let i = 1; i < copy.length; i++) {
		for (let j = i; j > 0; j--) {
			copy[j - 1] = new Bar(copy[j - 1].value, 'blue')
			copy[j] = new Bar(copy[j].value, 'red')
			anim.addFrame(copy)
			
			if (!descending && copy[j - 1].value > copy[j].value || descending && copy[j - 1].value < copy[j].value) {
				swap(copy, j, j - 1)
				anim.addFrame(copy)
				
				if (j - 1 == 0) copy[j - 1] = new Bar(copy[j - 1].value, 'green')
				copy[j] = new Bar(copy[j].value, 'green')
			} else {
				copy[j - 1] = new Bar(copy[j - 1].value, 'green')
				copy[j] = new Bar(copy[j].value, 'green')
				
				break
			}
		}
	}
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value, 'green')
	})
	anim.addFrame(copy)
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value)
	})
	
	return anim
}

export const quicksort = (arr, descending) => {
	const copy = [].concat(arr)
	copy.forEach(bar => {
		bar.color = 'white'
	})
	
	const anim = new Animation()
	
	const partition = (arr, l, r) => {
		arr[l] = new Bar(arr[l].value, 'purple')
		anim.addFrame(arr)
		
		const pivot = arr[l].value // 1st element
		let i = l + 1
		
		for (let j = i; j <= r; j++) {
			arr[j] = new Bar(arr[j].value, 'blue')
			arr[i] = new Bar(arr[i].value, 'red')
			anim.addFrame(arr)
			
			if (!descending && arr[j].value < pivot || descending && arr[j].value > pivot) {
				if (j != i) {
					swap(arr, i, j)
					anim.addFrame(arr)
				}
				arr[i] = new Bar(arr[i].value)
				i++
			}
			
			arr[j] = new Bar(arr[j].value)
			// arr[i] = new Bar(arr[i].value)
		}
		
		arr[l] = new Bar(arr[l].value, 'blue')
		arr[i - 1] = new Bar(arr[i - 1].value, 'red')
		anim.addFrame(arr)
		
		swap(arr, l, i - 1)
		anim.addFrame(arr)
		
		arr[l] = new Bar(arr[l].value)
		arr[i - 1] = new Bar(arr[i - 1].value, 'green')
		
		return i - 1
	}
	
	const sort = (arr, l, r) => {
		if (l < r) {
			const p = partition(arr, l, r); //index returned from partition
			sort(arr, l, p - 1)
			sort(arr, p + 1, r)
		} else if (l == r) {
			arr[l] = new Bar(arr[l].value, 'green')
			anim.addFrame(arr)
		}
		
		return arr;
	}
	
	sort(copy, 0, copy.length - 1)
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value, 'green')
	})
	anim.addFrame(copy)
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value)
	})
	
	return anim
}

export const mergesort = (arr, descending) => {
	const randomColor = () => {
		let i = Math.floor(Math.random()*3)
		let r = 0
		let g = 0
		let b = 0
		
		switch(i) {
			case 0:
				r = 255
				
				Math.floor(Math.random()*2) == 0? g = Math.floor(Math.random() * 256) : b = Math.floor(Math.random() * 256)
				break
			case 1:
				g = 255
				
				Math.floor(Math.random()*2) == 0? r = Math.floor(Math.random() * 256) : b = Math.floor(Math.random() * 256)
				break
			case 2:
				b = 255
				
				Math.floor(Math.random()*2) == 0? r = Math.floor(Math.random() * 256) : g = Math.floor(Math.random() * 256)
				break
		}
		
		r *= 16 ** 4
		g *= 16 ** 2
		
		return '#' + (r + g + b).toString(16)
	}

	const merge = (l, r, i) => {
		const result = []
		let lIdx = i
		let rIdx = i + l.length
		const lColor = copy[lIdx].color
		
		while (l.length > 0 && r.length > 0) {
			copy[lIdx] = new Bar(copy[lIdx].value, 'blue')
			copy[rIdx] = new Bar(copy[rIdx].value, 'red')
			anim.addFrame(copy)
			
			if (!descending && l[0].value <= r[0].value || descending && l[0].value >= r[0].value) {
				if (copy[i].value != copy[lIdx].value) {
					copy.splice(i, 0, copy.splice(lIdx, 1)[0])
					anim.addFrame(copy)
				}
				
				copy[lIdx] = new Bar(copy[lIdx].value, lColor)
				copy[rIdx] = new Bar(copy[rIdx].value, lColor)
				
				result.push(l.shift())
				
				lIdx++
			} else {
				if (copy[i].value != copy[rIdx].value) {
					copy.splice(i, 0, copy.splice(rIdx, 1)[0])
					anim.addFrame(copy)
				}
				
				copy[lIdx] = new Bar(copy[lIdx].value, lColor)
				copy[rIdx] = new Bar(copy[rIdx].value, lColor)
				
				result.push(r.shift())
				
				lIdx++
				rIdx++
			}
			
			i++
		}
		
		while (l.length > 0) {
			copy[lIdx] = new Bar(copy[lIdx].value, lColor)
			result.push(l.shift())
			
			lIdx++
		}
		while (r.length > 0) {
			copy[rIdx] = new Bar(copy[rIdx].value, lColor)
			result.push(r.shift())
			
			rIdx++
		}
		
		return result
	}

	const sort = (arr, i) => {
		if (arr.length <= 1) return arr
		
		let l = []
		let r = []
		
		arr.forEach((n, i) => {
			if (i < arr.length / 2) {
				l.push(n)
			} else {
				r.push(n)
			}
		})
		
		l = sort(l, i)
		r = sort(r, i + l.length)
		
		return merge(l, r, i)
	}
	
	const copy = [].concat(arr)
	copy.forEach(bar => {
		bar.color = 'white'
	})
	
	const anim = new Animation()
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value, randomColor())
	})
	anim.addFrame(copy)
	
	sort(copy, 0)
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value, 'green')
	})
	anim.addFrame(copy)
	
	copy.forEach((bar, i) => {
		copy[i] = new Bar(bar.value)
	})
	
	return anim
}