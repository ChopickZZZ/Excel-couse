import { DomListener } from "@core/DOMListener";

export class ExcelComponent extends DomListener {

	constructor($root, options = {}) {
		//Passing options.listeners to DOMListener
		super($root, options.listeners)
		this.name = options.name
		this.emitter = options.emitter
		this.unsubscribers = []

		this.prepare()
	}

	prepare() {

	}

	//returns template of component
	toHTML() {
		return ''
	}

	//Our own method to emit
	$emit(event, ...args) {
		this.emitter.emit(event, ...args)
	}

	//Subscribe to event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn)
		this.unsubscribers.push(unsub)
	}

	init() {
		this.initDOMListeners()
	}

	destroy() {
		this.removeDOMListeners()
		this.unsubscribers.forEach(unsub => unsub())
	}
}

