export const UNSORTED = 0
export const SORTED = 1

export const Bar = class {
	constructor(v) {
		this.value = v
		this.status = UNSORTED
	}
}