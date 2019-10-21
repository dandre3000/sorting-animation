/*!
 * timer
 *
 * todo: continous loop instead of interval for more precise timing
 */

'use strict';

//export {Timer};

class Timer {
	constructor(callback) {
		this.alarm = callback || null;
		this.loop = null;
		this.interval = 0;
		this.ack = null;
		this.lastTime = 0;
		this.elapsedTime = 0;
		this.accumulatedTime = 0;
		
		this.tick = time => {
			this.elapsedTime += Date.now() - this.lastTime;
			this.accumulatedTime += Date.now() - this.lastTime;
			while (this.accumulatedTime >= this.interval) {
				this.ack();
				this.accumulatedTime -= this.interval;
			}
			
			this.lastTime = Date.now();
			this.loop = requestAnimationFrame(this.tick);
		};
	}
	
	getTime() {
		// values that show on the clock
		const minutes = Math.floor(this.elapsedTime / 60000);
		const seconds = Math.ceil(this.elapsedTime / 1000) % 60;
		
		if (seconds === 60) {
			return (minutes + 1)+':'+0+0;
		} else if (seconds < 10) {
			return minutes+':'+0+seconds;
		} else {
			return minutes+':'+seconds;
		}
	};
	
	start(interval, callback) {
		this.lastTime = Date.now();
		this.interval = interval;
		if (callback && typeof(callback) == 'function') {
			this.ack = callback;
		}
		
		this.tick();
	};
	
	stop() {
		cancelAnimationFrame(this.loop);
		this.interval = 0;
		this.ack = null;
	};
	
	reset() {
		this.stop();
		this.elapsedTime = 0;
		this.accumulatedTime = 0;
	}
};