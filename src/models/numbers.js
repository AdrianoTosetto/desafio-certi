const { zip, nonZero, isZero, isOne, allZeros, removeSign } = require('../utils/util')

const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']
const dezenas =  ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
const centenas = ['', 'cem', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']

const between10And19 = [ // edge cases for numbers between 10 and 19
	'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
]

const above1000 = [
	{singular: 'mil', plural: 'mil'},
	{singular: 'milhão', plural: 'milhões'}, 
	{singular: 'bilhão', plural: 'bilhões'}, 
	{singular: 'trilhão', plural: 'trilhões'},
	{singular:'quadrilhão', plural: 'quadrilhões'}, 
	{singular: 'quintilhão', plural: 'quintilhões'},
	{singular: 'sextilhão', plural: 'sextilhões'},
	{singular: 'septilhão', plural: 'septilhões'},
    {singular: 'octilhão', plural: 'octilhões'}
]

/**
 * @number string with only 3 digits with the form ^\d{3}$
 * @returns string
 * 
 * @brief returns the written form of numbers of 3 digits 
 * 
 * @example handle3Digits(982) returns 'novecentos e oitenta e dois'
 * 
 */

const handle3Digits = number => {
	if (allZeros(number))
		return ''
	return number.split('').reduce((acc, digit, index, array) => {
		if (isZero(digit))
			return acc
		if (index === 0) {
			if (digit === '1' && (nonZero(array[1]) || nonZero(array[2]))) 
				return `cento e`
			if ((nonZero(array[1]) || nonZero(array[2])))
				return `${centenas[parseInt(digit)]} e`
			return `${centenas[parseInt(digit)]}`
		}
		if (index === 1) {
			const lookahead = array[index+1]
			if (digit === '1')
				return `${acc} ${between10And19[lookahead]}`
			if (nonZero(lookahead))
				return `${acc} ${dezenas[parseInt(digit)]} e`
			return `${acc} ${dezenas[parseInt(digit)]}`
		}
		if (index === 2) {
			const lookback = array[1]
			if (lookback === '1')
				return acc
			return `${acc} ${unidades[parseInt(digit)]}`
		}
	}, '').trim()
}

/**
 * @number string: number of any size, however it needs to be padded with 0s
 * 					if the number length is not multiple of 3
 * @returns string: the text form of the number
 * 
 * @brief returns the written form of a number of any size
 * 
 * @example numberAsText('999888777555') returns 'novecentos e noventa e nove bilhões e oitocentos e 
 * 										oitenta e oito milhões e setecentos e setenta e sete 
 * 										mil e quinhentos e cinquenta e cinco'
 */
const numberAsText = ( number ) => {
	if (allZeros(number))
		return 'zero'
	let isNegative = false
	if (number[0] === '-') {
		isNegative = true
		number = removeSign(number)
	}
	const temp1 = number.match(/.{1,3}/g) // eg: '123456000' -> ['123', '456', '000']
	const temp2 = above1000.slice(0, temp1.length - 1).reverse()
	// for example:
	// temp1 has the format: ['123', '456', '000'] and
	// temp2: [{singular: 'milhão', plural: 'milhões'}, {singular: 'mil', plural: 'mil'}]
	// then they will be zipped into a single array and then be concatenated
	// the zipped array will be [['123', {singular: 'milhão', plural: 'milhões'}], ...]
	const textNumber = zip(temp1, temp2).reduce((acc, e, index, array) => {
		const lastIndex = array.length - 1
		const [digitsNumber, { plural, singular }] = e

		if (allZeros(digitsNumber))
			return acc

		const text = isOne(digitsNumber) ? singular : plural
		const lookahead = array[index+1]
		const lookback  = array[index-1]

		if (index === lastIndex) {
			if (allZeros(lookback))
				return `${acc} e ${handle3Digits(digitsNumber)}`
			return `${acc} ${handle3Digits(digitsNumber)}`
		} else {
			if (allZeros(lookahead)) {
				if (allZeros(lookback))
					return `${acc} e ${handle3Digits(digitsNumber)} ${text}`
				return `${acc} ${handle3Digits(digitsNumber)} ${text}`
			} else {
				if (allZeros(lookback))
					return `${acc} e ${handle3Digits(digitsNumber)} ${text} e`
				return `${acc} ${handle3Digits(digitsNumber)} ${text} e`
			}
		}
	}, '')
	if (isNegative)
		return `menos ${textNumber.trim()}`
	return textNumber.trim()
}


module.exports = { numberAsText }
