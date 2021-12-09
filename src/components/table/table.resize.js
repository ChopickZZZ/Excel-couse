import { $ } from "@core/dom";

export function resizeHandler(event, $root) {
	//col-resize or row-resize
	const $resizer = $(event.target)
	//column or row
	const $parent = $resizer.closest('[data-type="resizable"]')
	const coords = $parent.getCoords()
	//Col or row
	const type = $resizer.data.resize
	let value = 0

	$resizer.css({
		opacity: 1
	})

	document.onmousemove = e => {

		if (type === 'col') {
			//px when you move from right side of column
			const delta = e.pageX - coords.right
			//delta + width of column itself
			value = coords.width + delta

			$resizer.css({
				right: -delta + 'px',
			})
		}
		else {
			//px when you move from right side of column
			const delta = e.pageY - coords.bottom
			//delta + width of column itself
			value = coords.height + delta
			$resizer.css({
				bottom: -delta + 'px',
			})
		}

	}
	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null

		if (type === 'col') {
			$parent.css({ width: value + 'px' })
			//Changing width of cells
			$root.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => el.style.width = value + 'px')
		}
		else {
			$parent.css({ height: value + 'px' })
		}

		$resizer.css({
			opacity: 0,
			bottom: 0,
			right: 0
		})
	}
}