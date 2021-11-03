import { DomListener } from "@core/DOMListener";

export class ExcelComponent extends DomListener {

	constructor($root, options = {}) {
		//Passing options.listeners to DOMListener
		super($root, options.listeners)
		this.name = options.name
	}

	//returns template of component
	toHTML() {
		return ''
	}

	init() {
		this.initDOMListeners()
	}

	destroy() {
		this.removeDOMListeners()
	}
}

