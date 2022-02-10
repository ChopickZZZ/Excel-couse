import { $ } from "@core/dom";
import { parse } from "@core/parse";
import { ExcelComponent } from "@core/ExcelComponent";
import { matrix, isCell, shouldResize, nextSelector } from "./table.functions";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { TableSelection } from "./TableSelection";
import { defaultStyles } from "../../constants";
import * as actions from "../../redux/actions";

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
	}

	toHTML() {
		return createTable(25, this.store.getState())
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init(event) {
		super.init()

		this.selectCell(this.$root.find('[data-id="0:0"]'))

		this.$on('formula:input', value => {
			this.selection.current
				.attr('data-value', value)
				.text(parse(value))
			this.updateTextInStore(value)
		})
		this.$on('formula:done', () => this.selection.current.focus())
		this.$on('toolbar:applyStyle', value => {
			this.selection.applyStyle(value)
			this.$dispatch(actions.applyStyle({
				value,
				ids: this.selection.selectedIds
			}))
		})
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
		const styles = $cell.getStyles(defaultStyles)
		this.$dispatch(actions.changeStyles(styles))
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler(event, this.$root)
			this.$dispatch(actions.tableResize(data))
		}
		catch (e) {
			console.warn('Resize error', e.message)
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event)
		}
		else if (isCell) {
			const $target = $(event.target)
			if (event.shiftKey) {
				const $cells = matrix(this.selection.current, $target)
					.map(id => this.$root.find(`[data-id="${id}"]`))

				this.selection.selectGroup($cells)
			}
			else {
				this.selectCell($target)
			}
		}
	}
	onKeydown(event) {

		const keys = ['Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']
		const { key } = event

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()

			const id = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next)
		}
	}

	updateTextInStore(value) {
		this.$dispatch(actions.changeText({
			id: this.selection.current.id(),
			value
		}))
	}

	onInput(event) {
		this.updateTextInStore($(event.target).text())
	}
}