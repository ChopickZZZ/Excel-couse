import { $ } from '@core/dom'
import { Emitter } from '../../core/Emitter'
import { StoreSubscriber } from '../../core/storeSubscriber'
import { preventDefault } from '../../core/utils'
import { updateDate } from '../../redux/actions'

export class Excel {
	constructor(options) {
		//Array of components(header, formula, toolbar, table)
		this.components = options.components || []
		this.emitter = new Emitter()
		this.store = options.store
		this.subscriber = new StoreSubscriber(this.store)
	}

	//creates content to insert in html 
	getRoot() {
		//Instance of Dom class - Dom {$el: div.excel}
		const $root = $.create('div', 'excel')

		const componentOptions = {
			emitter: this.emitter,
			store: this.store
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
	init() {
		if (process.env.NODE_ENV === 'production') {
			document.addEventListener('contextmenu', preventDefault)
		}
		this.store.dispatch(updateDate())
		this.subscriber.subscribeComponents(this.components)
		this.components.forEach(component => component.init())
	}
	destroy() {
		this.subscriber.unsubscribeFromStore()
		this.components.forEach(component => component.destroy())
		document.removeEventListener('contextmenu', preventDefault)
	}
}