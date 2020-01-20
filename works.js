const express = require('express')

const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(routes)

const numbers = [
	[], // leave empty so the char '1' remains in position 1 of numbers array
	['um', 'dez', 'cem', 'um', 'dez'],
	['dois', 'vinte', 'duzentos', 'dois', 'vinte'],
	['três', 'trinta', 'trezentos', 'três', 'trinta'],
	['quatro', 'quarenta', 'quatrocentos', 'quatro', 'quarenta'],
	['cinco', 'cinquenta', 'quinhentos', 'cinco', 'cinquenta'],
	['seis','sessenta','seiscentos', 'seis' ,'sessenta'],
	['sete','setenta','setecentos','sete', 'setenta'],
	['oito','oitenta', 'oitocentos', 'oito', 'oitenta'],
	['nove', 'noventa', 'novecentos', 'nove', 'noventa']
]

const aux = [ // corner case for numbers between 10 and 19
	[], // leave empty so the char '1' remains in position 1 of numbers array
	['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'],
	['vinte', 'vinte um', 'vinte dois', 'vinte três', 'vinte quatro', 'vinte cinco', 'vinte seis', 'vinte sete', 'vinte oito', 'vinte nove']
]

const paddNumber = (number, maxLen) => "0".repeat(maxLen - number.length) + number // ex: paddNumber(920,5) => 00920
// 26001
const writtenNumber = (number, len=5) => { //len in digits
	const padded = paddNumber(number, len)
	let skip = false
	const test = padded.split('').reduce((acc, e, index, array) => {
		const eIndex = parseInt(e)
		if (skip) {
			skip = false
			return [...acc]
		}
		if (e === '0')
			return [...acc]
		if (index % 3 === 0 && ['1', '2'].includes(e) ) {
			skip = true
			//console.log('aqui', e, index)
			if (len > index+2) {
				//console.log('aqui1', e, index)
				return [...acc, aux[parseInt(e)][parseInt(array[index+1])], 'mil']
			} else
				return [...acc, aux[parseInt(e)][parseInt(array[index+1])]]
		}
		if (index === 3 && ['1', '2'].includes(e)) {
			return [...acc, aux[parseInt(e)][parseInt(array[index+1])]]
		}
		if (index === 4 && ['1', '2'].includes(array[3])) {
			return [...acc]
		}
		if (index % 2 === 0 && e == '1' && ((array[index+1] !== '0' && array[index+1] != undefined) || (array[index+2] !== '0' && array[index+2] != undefined )))
			return [...acc, 'cento']
		if (index === 1) {
			return [...acc, numbers[parseInt(e)][4 - index], 'mil']
		}
		return [...acc, numbers[parseInt(e)][4 - index]]
	}, [])
	console.log('test', test)
}

const writtenNumber = (number) => {
	let skip = false
	const padding = number.length % 3 === 0 ? 0: 3 - (number.length % 3) // 23 becomes 023, 1 becomes 001, 231 remains 231, 1202 becomes and so on
	const padded = paddNumber(number, padding)
	let i = parseInt(padded.length / 3) - 2
	const test = padded.split('').reduce((acc, digit, index, array) => {
		let a = []
		if (index % 3 === 2) {
			if (index !== padded.length - 1) {
				if (nonZero(digit) || nonZero(array[index-1]) || nonZero(array[index-2])) { // cases like 555 000 555 where the "000"
					if (digit === '1' && array[index-1] === '0' && array[index-2] === '0')
						a = [temp[i]]
					else
						a = [plural[i]]
				}
			}
			i--
		}
		if (skip || digit === '0') {
			skip = false
			return [...acc, ...a]
		}
		if (index % 3 === 0) {
			if (digit === '1' && (nonZero(array[index+1]) || nonZero(array[index+2])))
				return [...acc, 'cento']
			return [...acc, numbers[parseInt(digit)][2]]
		}
		if (index % 3 === 1) {
			if (['1', '2'].includes(digit)) { // corner cases like onze, doze, treze...
				skip = true // skip next digit because it will have already received its written form
				const d1 = digit
				const d2 = array[index+1]
				return [...acc, getTen(d1, d2)]
			}
			return [...acc, numbers[parseInt(digit)][index % 3]]
		}
		if (index % 3 === 2) {
			return [...acc, numbers[parseInt(digit)][0], ...a]
		}
	}, [])
	console.log('test = ', test)
}

//writtenNumber("9999112")
/*writtenNumber("10112")
writtenNumber("10100")
writtenNumber("26001")
writtenNumber("26101")
writtenNumber("85011")
writtenNumber("75111")
writtenNumber("8511")
writtenNumber("5001")
writtenNumber("99999")
writtenNumber("10000")
writtenNumber("99")*/

writtenNumber("85011")
writtenNumber("85111")
writtenNumber("8511")
writtenNumber("5001")

//app.listen(8080)