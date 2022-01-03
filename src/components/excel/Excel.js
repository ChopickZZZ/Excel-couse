import { $ } from '@core/dom'
import { Emitter } from '../../core/Emitter'

export class Excel {
	constructor(selector, options) {
		//Node from this selector
		this.$el = $(selector)
		//Array of components(header, formula, toolbar, table)
		this.components = options.components || []
		this.emitter = new Emitter()
	}

	//creates content to insert in html 
	getRoot() {
		//Instance of Dom class - Dom {$el: div.excel}
		const $root = $.create('div', 'excel')

		const componentOptions = {
			emitter: this.emitter
		}
		//Each Component is a Class
		this.components = this.components.map(Component => {
			//Component as a node in html
			const $el = $.create('div', Component.className)
			const component = new Component($el, componentOptions) //parameter extends DomListener

			if (component.name) {
				window['c' + component.name] = component
			}

			$el.html(component.toHTML())
			//Invoking our own method of appending nodes
			$root.append($el)
			return component
		})

		return $root
	}

	//insert $root.$el in $el maden in getRoot() 
	render() {
		//Invoking our own method of appending nodes
		this.$el.append(this.getRoot())

		this.components.forEach(component => component.init())
	}
	destroy() {
		this.components.forEach(component => component.destroy())
	}
}