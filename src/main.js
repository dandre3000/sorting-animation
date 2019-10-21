//import {Timer} from './timer.js';

'use strict';

const canv = document.createElement('canvas');
canv.width = 1280;
canv.height = 720;

const ctx = canv.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canv.width, canv.height);

const dt = 1000 / 60;
var pause = false;

const data = [];
const DATA_SIZE = 1000;

const bar = {
	w: canv.width / DATA_SIZE,
	maxH: 500
}

const createData = size => {
	for (let i = 0; i < size; i++) {
		const dataPoint = {
			value: Math.random(),
			state: 'unsorted'
		};
		data[i] = Math.random();
	}
};

const algorithms = new Map();

const render = (arr, idx = null, color = null) => {
	var set = new Set();
	if (Array.isArray(arr)) {
		set = new Set(arr);
	}
	
	if (set.has('data') || arr == 'all') {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, canv.height - 500, canv.width, canv.height - (canv.height - 500));
		
		data.forEach((d, idx) => {
			ctx.fillStyle = 'white';
			ctx.fillRect(bar.w * idx, canv.height, bar.w / 2, d * -500);
		});
	}
	
	if (set.has('timer') || arr == 'all') {
		ctx.fillStyle = 'black';
		ctx.fillRect(4, 6, 128, 12);
		
		ctx.fillStyle = 'white';
		ctx.textAlign = 'left';
		ctx.fillText(timer.getTime(), 16, 16);
	}
	
	if (set.has('bar')) {
		if (idx !== null && data[idx]) {
			ctx.fillStyle = 'black';
			ctx.fillRect(bar.w * idx - 1, canv.height, bar.w / 2 + 2, -501);
			
			ctx.fillStyle = color || 'red';
			ctx.fillRect(bar.w * idx, canv.height, bar.w / 2, data[idx] * -500);
		}
	}
};

const sleep = ms => {
	return new Promise(res => setTimeout(res, ms));
};

const timer = new Timer();

const start = () => {
	loop = requestAnimationFrame(update);
};

const stop = () => {
	cancelAnimationFrame(loop);
};

Array.prototype.swap = async function(a, b) {
	await sleep(dt);
	
	let temp;
	if (-1 < a && a < this.length) {
		temp = this[a];
	} else {
		console.error(`Index ${a} does not exist.`);
		return;
	}
	
	if (-1 < b && b < this.length) {
		this[a] = this[b];
		this[b] = temp;
	} else {
		console.error(`Index ${b} does not exist.`);
		return;
	}
};

Array.prototype.isSorted = async function(asc = true) {
	for (let i = 0; i < this.length; i++) {
		if (typeof(this[i]) != 'number') {
			console.error(`Value of index ${i} is not a number.`);
			return false;
		}
		
		await sleep(dt);
		
		render(['bar'], i, 'green');
		
		if (i == this.length - 1) {
			return true;
		}
		
		if (asc) {
			if (this[i] > this[i + 1]) {
				return false;
			}
		} else {
			if (this[i] < this[i + 1]) {
				return false;
			}
		}
	}
};

const asyncSort = async (arr, algorithm) => {
	if (typeof(algorithm == 'function')) {
		await algorithm(arr);
		timer.stop();
		await arr.isSorted();
	}
};

algorithms.set('quicksort', async (arr, lo = 0, hi = arr.length - 1) => {
	const partition = async () => {
		const pivot = arr[hi];
		let i = lo;
		for (let j = lo; j < hi; j++) {
			if (pause) {
				break;
			}
			
			if (arr[j] < pivot) {
				await arr.swap(i, j);
				render(['bar'], i);
				render(['bar'], j);
				i++;
			}
		}
		
		if (!pause) {
			await arr.swap(i, hi);
			render(['bar'], i);
			render(['bar'], hi);
			return i;
		}
	};
	
	if (lo < hi) {
		let p = await partition(arr, lo, hi);
		await algorithms.get('quicksort')(arr, lo, p - 1);
		await algorithms.get('quicksort')(arr, p + 1, hi);
	}
});


algorithms.set('bubblesort', async arr => {
	var swapped = false;
	do {
		if (pause) {
			break;
		}
			
		swapped = false;
		for (let i = 1; i < arr.length; i++) {
			if (arr[i - 1] > arr[i]) {
				await arr.swap(i - 1, i);
				render(['bar'], i - 1);
				render(['bar'], i);
				swapped = true;
			}
		}
	} while (swapped != false);
});

algorithms.set('selection sort', async arr => {
	for (let i = 0; i < arr.length - 1; i++) {
		if (pause) {
			break;
		}
		
		let min = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[min]) {
				min = j;
			}
		}
		
		if (min != i) {
			await arr.swap(i, min);
			render(['bar'], i);
			render(['bar'], min);
		}
	}
});

algorithms.set('insertion sort', async arr => {
	let i = 1;
	while (i < arr.length) {
		if (pause) {
			break;
		}
		
		let j = i;
		while (j > 0 && arr[j - 1] > arr[j]) {
			await arr.swap(j, j - 1);
			render(['bar'], j);
			render(['bar'], j - 1);
			
			j--;
		}
		
		i++;
	}
});

window.onload = () => {
	$('main').prepend(canv);
	$('canvas').addClass('img-fluid mx-auto');
	
	const $reset = $('#reset');
	$reset.click(() => {
		pause = true;
		timer.reset();
		createData(DATA_SIZE);
		render('all');
	});
	
	const $start = $('#start');
	$start.click(() => {
		pause = false;
		
		timer.start(1000, () => {
			render(['timer']);
		});
		
		let alg = $('#algorithm')[0][$('#algorithm')[0].selectedIndex].value;
		asyncSort(data, algorithms.get(alg));
	});
	
	createData(DATA_SIZE);
	render('all');
};