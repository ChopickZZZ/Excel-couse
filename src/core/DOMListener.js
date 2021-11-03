import { capitalize } from "@core/utils"

//Adding and removing Listeners

export class DomListener {
	//root element inside $el, array with listeners
	constructor($root, listeners = []) {

		if (!$root) {
			throw new Error(`No $root provided for DomListener`)
		}

		//Private variables
		this.$root = $root
		this.listeners = listeners
	}

	initDOMListeners() {
		this.listeners.forEach(listener => {
			//method = listener with On
			const method = getMethodName(listener)

			//If method is not implemented
			if (!this[method]) {
				throw new Error(`Method ${method} is not implemented in ${this.name || ''} component`)
			}

			this[method] = this[method].bind(this)
			//Our own addEventListener
			this.$root.on(listener, this[method])
		})
	}

	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)

			this.$root.off(listener, this[method])
		})
	}
}

function getMethodName(eventName) {
	return 'on' + capitalize(eventName)
}