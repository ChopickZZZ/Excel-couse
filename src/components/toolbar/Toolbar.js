import { ExcelStateComponent } from "@core/ExcelStateComponent";
import { createToolbar } from "./toolbar.template";
import { defaultStyles } from "../../constants";
import { $ } from "@core/dom.js";

export class Toolbar extends ExcelStateComponent {
	static className = 'excel__toolbar'

	constructor($root, options) {
		//Object with options, passing to ExcelComponent
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],
			...options
		})
	}

	prepare() {
		this.initState(defaultStyles)
	}

	get template() {
		return createToolbar(this.state)
	}

	toHTML() {
		return this.template
	}

	storeChanged(changes) {
		this.setState(changes.currentStyles)
		console.log('ToolBar changes: ', changes)
	}

	onClick(event) {
		const $target = $(event.target)
		if ($target.data.type === 'button') {
			const value = JSON.parse($target.data.value)
			this.$emit('toolbar:applyStyle', value)
		}
	}
}