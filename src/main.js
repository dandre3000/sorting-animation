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
var started = false;
var depth = 0;
var sequence = [];

const algorithms = new Map();
var data = [];
var DATA_SIZE = 100;
const timer = new Timer();

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
	
	if (set.has('hud') || arr == 'all') {
		ctx.fillStyle = 'black';
		ctx.fillRect(198, 6, 120, 48);
		
		let comparisons = 0, swaps = 0, shuffles = 0;
		sequence.forEach(step => {
			switch(step.type) {
				case 'comparison':
					comparisons++;
					break;
				case 'swap':
					swaps++;
					break;
				case 'shuffle':
					shuffles++;
					break;
			}
		});
		
		ctx.fillStyle = 'white';
		ctx.textAlign = 'left';
		ctx.fillText('Comparisons: ' + comparisons, 200, 16);
		ctx.fillText('Swaps: ' + swaps, 200, 32);
		ctx.fillText('Shuffles: ' + shuffles, 200, 48);
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

const start = () => {
	loop = requestAnimationFrame(update);
};

const stop = () => {
	cancelAnimationFrame(loop);
};

Array.prototype.swap = function(a, b) {
	//await sleep(dt);
	
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

const drawSort = async (depth = 0) => {
	if (depth > sequence.length /* depth > swaps.length - 1 && depth > shuffles.length - 1 */) {
		console.error('Too deep');
		return;
	}
	
	let i = depth;
	/* if (depth > depth) {
		for (i; i < depth; i++) {
			if (i < swaps.length) {
				data.swap(swaps[i][0], swaps[i][1]);
			}
			
			/* if (i < shuffles.length) {
				let idx = shuffles[i].idx;
				let p = shuffles[i].part;
				for (let j = 0; j < p.length; j++) {
					if (p[j] != data[idx + j]) {
						data[idx + j] = p[j];
					}
				}
		}
	} else if (depth < depth) {
		for (i; i > depth - 1; i--) {
			if (i < swaps.length) {
				data.swap(swaps[i][0], swaps[i][1]);
			}
		}
	} */
	
	let j = 0, k = 0;
	while (!pause && i < sequence.length) {
		switch(sequence[i].type) {
			case 'comparison':
				let comparison = sequence[i];
				render(['data']);
				render(['bar'], comparison.a, 'green');
				render(['bar'], comparison.b, 'green');
				await sleep(dt);
				break;
			case 'swap':
				let swap = sequence[i];
				data.swap(swap.a, swap.b);
				
				render(['data']); 
				render(['bar'], swap.a);
				render(['bar'], swap.b);
				await sleep(dt);
				break;
			case 'shuffle':
				let shuffle = sequence[i];
				data.splice(shuffle.a, 1);
				data.splice(shuffle.b, 0, shuffle.v);
				
				render(['data']);
				render(['bar'], shuffle.a);
				render(['bar'], shuffle.b);
				await sleep(dt);
				break;
		}
			
		i++;
	}
	
	depth = i;
	timer.stop();
};

algorithms.change = alg => {
	sequence = [];
	algorithms.get(alg)(data.slice(0));
	
	render(['hud']);
};

algorithms.set('quicksort', (arr, lo = 0, hi = arr.length - 1) => {
	const partition = () => {
		const pivot = arr[hi];
		let i = lo;
		for (let j = lo; j < hi; j++) {
			sequence.push({type: 'comparison', a: j, b: hi});
			if (arr[j] < pivot) {
				sequence.push({type: 'swap', a: i, b: j});
				arr.swap(i, j);
				i++;
			}
		}
		
		sequence.push({type: 'swap', a: i, b: hi});
		arr.swap(i, hi);
		return i;
	};
	
	if (lo < hi) {
		let p = partition(arr, lo, hi);
		algorithms.get('quicksort')(arr, lo, p - 1);
		algorithms.get('quicksort')(arr, p + 1, hi);
	}
});

algorithms.set('bubblesort', arr => {
	let swapped = false;
	do {
		swapped = false;
		for (let i = 1; i < arr.length; i++) {
			sequence.push({type: 'comparison', a: i - 1, b: i});
			if (arr[i - 1] > arr[i]) {
				sequence.push({type: 'swap', a: i - 1, b: i});
				arr.swap(i - 1, i);
				swapped = true;
			}
		}
	} while (swapped != false);
});

algorithms.set('selection sort', arr => {
	for (let i = 0; i < arr.length - 1; i++) {
		
		let min = i;
		for (let j = i + 1; j < arr.length; j++) {
			sequence.push({type: 'comparison', a: j, b: min});
			if (arr[j] < arr[min]) {
				min = j;
			}
		}
		
		//sequence.push({type: 'comparison', a: i, b: min});
		if (min != i) {
			sequence.push({type: 'swap', a: i, b: min});
			arr.swap(i, min);
		}
	}
});

algorithms.set('insertion sort', arr => {
	let i = 1;
	while (i < arr.length) {
		let j = i;
		sequence.push({type: 'comparison', a: j - 1, b: j});
		while (j > 0 && arr[j - 1] > arr[j]) {
			sequence.push({type: 'swap', a: j, b: j - 1});
			arr.swap(j, j - 1);
			
			j--;
		}
		
		i++;
	}
});

algorithms.set('merge sort', (arr, idx = 0) => {
	const merge = (left, right) => {
		let result = [];

		let iL = idx;
		let iR = idx + left.length;
		while (left.length > 0 && right.length > 0) {
			sequence.push({type: 'comparison', a: iL, b: iR});
			if (left[0] <= right[0]) {
				result.push(left.shift());
				iL++;
			} else {
				sequence.push({type: 'shuffle', a: iR, b: idx + result.length, v: right[0]}); // when ascending part is sorted if left side is <= right
				result.push(right.shift());
				iR++;
			}
		}

		// (Only one of the following loops will actually be entered.)
		while (left.length > 0) {
			result.push(left.shift());
		}
		while (right.length > 0) {
			result.push(right.shift());
		}
		
		return result;
	};
	
	if (arr.length <= 1) {
		return arr;
	}
	
	let l = [];
    let r = [];
    for (let i = 0; i < arr.length; i++) {
        if (i < arr.length / 2) {
            l.push(arr[i]);
        } else {
            r.push(arr[i]);
		}
	}
	
    l = algorithms.get('merge sort')(l, idx);
    r = algorithms.get('merge sort')(r, idx + l.length);
	
    let m = merge(l, r);
	return m;
});

window.onload = () => {
	$('main').prepend(canv);
	$('canvas').addClass('img-fluid mx-auto');
	
	const $values = $('#values')[0];
	$('#values').keyup(() => {
		try {
			DATA_SIZE = eval($values.value) <= 1000 ? eval($values.value) : 1000;
			createData(DATA_SIZE);
			bar.w = canv.width / DATA_SIZE;
			render('all');
		} catch(e) {
			DATA_SIZE = 100;
			console.error('Not a number.');
		}
	});
	
	const $reset = $('#reset');
	$reset.click(() => {
		started = false;
		pause = true;
		timer.reset();
		createData(DATA_SIZE);
		$start.html('Start');
		render('all');
	});
	
	const $start = $('#start');
	$start.click(() => {
		if (!started) {
			started = true;
			pause = false;
			
			$start.html('Stop');
			timer.start(1000, () => {
				render(['timer']);
			});
			
			let alg = $('#algorithm')[0][$('#algorithm')[0].selectedIndex].value;
			depth = 0;
			algorithms.change(alg);
			drawSort();
			started = false;
		} else if (!pause) {
			pause = true;
		} else {
			pause = false;
			drawSort(depth);
		}
	});
	
	createData(DATA_SIZE);
	render('all');
};