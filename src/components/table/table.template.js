import { parse } from "../../core/parse"
import { toInlineStyles } from "../../core/utils"

const CODES = {
	A: 65,
	Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function toCell(state, row) {
	return function (_, col) {
		const width = state.colState
		const id = `${row}:${col}`
		const data = state.dataState[id]
		const styles = toInlineStyles(state.stylesState[id])
		return `
			<div class="cell"
			contenteditable
			data-type="cell"
			data-col="${col}" 
			data-row="${row}" 
			data-id="${row}:${col}"
			data-value="${data || ''}"
			style="${styles};
			width: ${getWidth(width, col)}"
			>${parse(data) || ''}</div>
		`
	}
}

function toColumn({ col, index, width }) {
	return `
	<div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
		${col}
		<div class="col-resize" data-resize="col"></div>
	</div>
	`
}

function createRow(content, index = '', state) {
	const height = getHeight(state, index)
	const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : ''

	return `
		<div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
			<div class="row-info">
				${index ? index : ''}
				${resizer}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

// '_' is a placeholder (We are not using this parameter)
function toChar(_, index) {
	return String.fromCodePoint(CODES.A + index)
}

function getWidth(state, index) {
	return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
	if (index === '') return
	return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function widthFrom(state) {
	return function (col, index) {
		return {
			col, index, width: getWidth(state.colState, index)
		}
	}
}

export function createTable(rowsCount = 25, state = {}) {
	//amount of columns
	const colsCount = CODES.Z - CODES.A + 1
	//Array with rows
	const rows = []

	//Array with cols with 25 elements (amount of columns)
	const cols = new Array(colsCount)
		.fill('')
		.map((el, index) => toChar(el, index))
		.map(widthFrom(state))
		.map(toColumn)
		.join('')

	rows.push(createRow(cols))

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(state, row))
			.join('')
		rows.push(createRow(cells, row + 1, state.rowState))
	}

	return rows.join('')

}
