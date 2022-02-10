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

	text(text) {
		if (typeof text !== 'undefined') {
			this.$el.textContent = text
			return this
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim()
		}
		else {
			return this.$el.textContent.trim()
		}
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

	get data() {
		return this.$el.dataset
	}

	//method to return an instance of DOM
	closest(selector) {
		return $(this.$el.closest(selector))
	}
	//method to gain coordinates of instance
	getCoords() {
		return this.$el.getBoundingClientRect()
	}
	find(selector) {
		return $(this.$el.querySelector(selector))
	}
	//Out own querySelectorAll
	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}
	css(styles = {}) {
		Object.keys(styles)
			.forEach(key => this.$el.style[key] = styles[key])
	}
	getStyles(styles = {}) {
		return Object.keys(styles).reduce((res, st) => {
			res[st] = this.$el.style[st] || styles[st]
			return res
		}, {})
	}
	addClass(className) {
		this.$el.classList.add(className)
		return this
	}
	removeClass(className) {
		this.$el.classList.remove(className)
		return this
	}
	id(parse) {
		if (parse) {
			const parsed = this.id().split(':')
			return {
				row: +parsed[0],
				col: +parsed[1]
			}
		}
		return this.data.id
	}
	focus() {
		this.$el.focus()
		return this
	}
	attr(name, value) {
		if (value) {
			this.$el.setAttribute(name, value)
			return this
		}
		else return this.$el.getAttribute(name)
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
