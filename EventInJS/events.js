'use strict';

class EE {
	constructor() {
		this.handlers = {};
	}

	subscribe(name, fn) {
		if (this.handlers[name]) {
			this.handlers[name].push(fn);
		} else {
			this.handlers[name] = [fn];
		}
	}

	emit(name, data) {
		let targetHandler = this.handlers[name];
		if (!this.handlers[name]) { return; }

		for (let i = 0; i < targetHandler.length; i++) {
			let fn = targetHandler[i];

			fn(data);
		}
	};

	removeListener(name, fn) {
		let targetHandler = this.handlers[name];
		if (!targetHandler) { return; }

		let index = targetHandler.indexOf(fn);
		if (index !== -1) {
			targetHandler.splice(index, 1);
		}
	};

	once(name, fn) {
		let that = this;
		this.subscribe(name, function handler(data) {
			that.removeListener(name, handler);
			fn(data);
		});
	};
}

module.exports = new EE();