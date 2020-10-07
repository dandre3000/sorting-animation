import {isNumberArray, bubbleSort} from './algorithms.js'

test('array is all numbers [1, "3", 0.009]', () => {
	expect(isNumberArray([1, "3", 0.009])).toBe(true)
})
test('array is all numbers [1, "Q", true]', () => {
	expect(isNumberArray([1, "Q", true])).toBe(false)
})

test('Bubble sort [8, 1, 5, 7, 3, 6, 2, 9, 4]', () => {
	expect(bubbleSort([8, 1, 5, 7, 3, 6, 2, 9, 4]).array).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
})