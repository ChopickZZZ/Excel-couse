//Unicode from A to Z
const CODES = {
	A: 65,
	Z: 90
}

function toCell() {
	return `
		<div class="cell" contenteditable></div>
	`
}

function toColumn(col) {
	return `
	<div class="column">${col}</div>
	`
}

function createRow(content, index = '') {
	return `
		<div class="row">
			<div class="row-info">${index}</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

// '_' is a placeholder (We are not using this parameter)
function toChar(_, index) {
	return String.fromCodePoint(CODES.A + index)
}

export function createTable(rowsCount = 15) {
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

	console.log(cols)

	rows.push(createRow(cols))

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell)
			.join('')
		rows.push(createRow(cells, i + 1))
	}

	return rows.join('')
}