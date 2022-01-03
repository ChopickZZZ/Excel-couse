//Unicode from A to Z
const CODES = {
	A: 65,
	Z: 90
}

/*function toCell(row, col) {
	return `
		<div class="cell" contenteditable data-col="${col}" data-row="${row}"></div>
	`
}*/

function toCell(row) {
	return function (_, col) {
		return `
			<div class="cell"
			contenteditable
			data-type="cell"
			data-col="${col}" data-id="${row}:${col}"></div>
		`
	}
}

function toColumn(col, index) {
	return `
	<div class="column" data-type="resizable" data-col="${index}">
		${col}
		<div class="col-resize" data-resize="col"></div>
	</div>
	`
}

function createRow(content, index = '') {

	const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : ''

	return `
		<div class="row" data-type="resizable">
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

export function createTable(rowsCount = 25) {
	//amount of columns
	const colsCount = CODES.Z - CODES.A + 1
	//Array with rows
	const rows = []

	//Array with cols with 25 elements (amount of columns)
	const cols = new Array(colsCount)
		.fill('')
		.map((el, index) => toChar(el, index))
		// => createCol(el)
		.map(toColumn)
		.join('')

	rows.push(createRow(cols))

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			//.map((_, col) => toCell(row, col))
			.map(toCell(row))
			.join('')
		rows.push(createRow(cells, row + 1))
	}

	return rows.join('')

}
