import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Formula } from '@/components/formula/Formula'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Table } from '@/components/table/Table'
import './scss/index.scss'


const excel = new Excel('#app', {
	//Array of components (header, formula, toolbar, table)
	components: [Header, Toolbar, Formula, Table]
})

excel.render()