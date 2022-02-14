import { defaultStyles, defaultTitle } from "../constants"

const defaultState = {
	title: defaultTitle,
	rowState: {},
	colState: {},
	dataState: {}, //{0:1, vcxvxcc}
	stylesState: {},
	headerName: 'Новая Таблица',
	currentStyles: defaultStyles,
	openDate: new Date().toJSON()
}

const normalize = state => ({
	...state,
	currentStyles: defaultStyles,
	currentText: ''
})

export function normalizeInitialState(state) {
	return state ? normalize(state) : defaultState
}