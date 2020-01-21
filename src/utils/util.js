/**
 * @params arrayOne: array 
 * @params arrayTwo: array
 * @params filler: any type, used when the second array does not have enough elements
 * 
 * @returns array
 * 
 * @usage zip([1,2,3], ['a', 'b', 'c']) returns [[1, 'a'], [2, 'b'], [2, 'c']]
*/

const DEFAULT_FILLER = {singular: '', plural: ''}

const zip = (arrayOne, arrayTwo, filler=DEFAULT_FILLER) => 
    arrayOne.map((element, index) => [element, arrayTwo[index] || filler])

const nonZero = char => char !== '0'
const isZero = char => char === '0'
const isOne = str => parseInt(str) === 1
const allZeros = str => parseInt(str) === 0
const removeSign = number => number[0] === '-' ? number.slice(1, number.length) : number

const paddNumber = (number, paddingSize) => {
    if (number[0] === '-')
        return `-${'0'.repeat(paddingSize)}${removeSign(number)}`
    return '0'.repeat(paddingSize) + number
}

module.exports = { zip, nonZero, isZero, isOne, allZeros, removeSign, paddNumber }