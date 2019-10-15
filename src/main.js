//import {Timer} from './timer.js';

'use strict';

const canv = document.createElement('canvas');
canv.width = 1280;
canv.height = 720;

const ctx = canv.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canv.width, canv.height);

const dt = 1000 / 60;
const data = [];
const createData = size => {
	for (let i = 0; i < size; i++) {
		const dataPoint = {
			value: Math.random(),
			state: 'unsorted'
		};
		data[i] = Math.random();
	}
};

const render = (arr) => {
	var set = new Set();
	if (Array.isArray(arr)) {
		set = new Set(arr);
	}
	
	if (set.has('data') || arr == 'all') {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, canv.height - 500, canv.width, canv.height - (canv.height - 500));
		
		data.forEach((d, idx) => {
			ctx.fillStyle = 'white';
			ctx.fillRect(4 * idx, canv.height, canv.width / (data.length * 2), d * -500);
		});
	}
	
	if (set.has('timer') || arr == 'all') {
		ctx.fillStyle = 'black';
		ctx.fillRect(4, 6, 128, 12);
		
		ctx.fillStyle = 'white';
		ctx.textAlign = 'left';
		ctx.fillText(timer.getTime(), 16, 16);
	}
};

/* var elapsedTime = 0;
var lastTime = 0;
var loop = null;
const update = (time = elapsedTime) => {
	elapsedTime += time - lastTime;
	render(['timer']);
	
	lastTime = time;
	loop = requestAnimationFrame(update);
}; */
const timer = new Timer(0);

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

Array.prototype.isSorted = function(asc = true) {
	for (let i = 0; i < this.length; i++) {
		if (typeof(this[i]) != 'number') {
			console.error(`Value of index ${i} is not a number.`);
			return false;
		}
		
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

const quicksort = async (arr, lo, hi) => {
	if (arr.isSorted()) {
		timer.stop();
	}
	
	const partition = async () => {
		const pivot = arr[hi];
		let i = lo;
		for (let j = lo; j < hi; j++) {
			if (arr[j] < pivot) {
				await arr.swap(i, j);
				render(['data']);
				i++;
			}
		}
		await arr.swap(i, hi);
		render(['data']);
		return i;
	};
	
	if (lo < hi) {
		let p = await partition(arr, lo, hi);
		await quicksort(arr, lo, p - 1);
		await quicksort(arr, p + 1, hi);
	}
};

const sleep = ms => {
	return new Promise(res => setTimeout(res, ms));
};

window.onload = () => {
	$('main').prepend(canv);
	$('canvas').addClass('img-fluid mx-auto');
	
	const $reset = $('#reset');
	$reset.click(() => {
		createData(320);
		render('all');
	});
	
	const $start = $('#start');
	$start.click(() => {
		timer.start(1000, () => {
			render(['timer']);
		});
		quicksort(data, 0, data.length - 1);
	});
	
	createData(320);
	render('all');
};