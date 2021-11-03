//Class to work with dom, jQuery clone

class Dom {
	constructor(selector) {
		//Finding element ($el)
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector

	}

	//Setting content of $el
	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html
			return this
		}
		return this.$el.outerHTML.trim()
	}

	//Clearing content of $el
	clear() {
		this.html('')
		return this
	}

	//Our own method to append nodes where this.$el is instance and node could be instance too (NOT NODES)
	append(node) {

		if (node instanceof Dom) {
			node = node.$el
		}

		if (Element.prototype.append) {
			this.$el.append(node)
		}
		else {
			this.$el.appendChild(node)
		}
		//Pattern to chain smth
		return this
	}

	//Our own AddEventListeners
	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback)
	}
	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback)
	}

}

//Exporting function instead of class
export function $(selector) {
	return new Dom(selector)

}

//Method of this function that creates element of (Component)
$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName)

	if (classes) {
		el.classList.add(classes)
	}

	return $(el)
}