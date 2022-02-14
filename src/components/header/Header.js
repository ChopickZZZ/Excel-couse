import { ExcelComponent } from "@core/ExcelComponent"
import { defaultTitle } from "../../constants";
import { $ } from "@core/dom"
import * as actions from "../../redux/actions";
import { ActiveRoute } from "../../core/routs/ActiveRoute";

export class Header extends ExcelComponent {
	static className = 'excel__header'

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options
		})
	}

	toHTML() {
		const title = this.store.getState().title || defaultTitle
		return `
			<input type="text" class="input" data-type="header" value="${title}" />
			<div>
				<div class="button" data-button="remove">
					<i class="material-icons" data-button="remove">delete</i>
				</div>

				<div class="button" data-button="exit">
					<i class="material-icons" data-button="exit">exit_to_app</i>
				</div>
			</div>
		`
	}

	onInput(event) {
		const $target = $(event.target)
		this.$dispatch(actions.changeTitle($target.text()))
	}

	onClick(event) {
		const $target = $(event.target)
		if ($target.data.button === 'remove') {
			const decision = confirm('Are you sure you want to delete this table?')
			if (decision) {
				localStorage.removeItem('excel:' + ActiveRoute.param)
				ActiveRoute.navigate('')
			}
		}
		else if ($target.data.button === 'exit') {
			ActiveRoute.navigate('')
		}

	}
}