class Event {
	private handlers: Object;

	constructor() {
		this.handlers = {};
	}

	subscribe(name, fn: Function): void {
		if (this.handlers[name]) {
			this.handlers[name].push(fn);
		} else {
			this.handlers[name] = [fn];
		}
	}

	emit(name, data): void {
		let targetHandler = this.handlers[name];
		if (!this.handlers[name]) { return; }

		for (let i = 0; i < targetHandler.length; i++) {
			let fn = targetHandler[i];

			fn(data);
		}
	};

	removeListener(name, fn: Function): void {
		let targetHandler = this.handlers[name];
		if (!targetHandler) { return; }

		let index = targetHandler.indexOf(fn);
		if (index !== -1) {
			targetHandler.splice(index, 1);
		}
	};

	once(name, fn: Function): void {
		let that = this;
		this.subscribe(name, function handler(data) {
			that.removeListener(name, handler);
			fn(data);
		});
	};

	static bootstrap(): Event {
		return new Event();
	}
}

export { Event };