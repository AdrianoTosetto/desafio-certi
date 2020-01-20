const test = require('ava')
const { numberAsText } = require('../models/numbers')
const { paddNumber } = require('../utils/util')

test('Should return the written form of -123803001003', async t => {
    const number = paddNumber('-123803001003', 0)
    const writtenForm = 'menos cento e vinte e três bilhões e oitocentos e três milhões e um mil e três'
    t.is(numberAsText(number, true), writtenForm)
});

test('Should return the written form of 99999', async t => {
    const number = paddNumber('99999', 1)
    const writtenForm = 'noventa e nove mil e novecentos e noventa e nove'
    t.is(numberAsText(number, true), writtenForm)
});

test('Should return the written form of 94587', async t => {
    const number = paddNumber('94587', 1)
    const writtenForm = 'noventa e quatro mil e quinhentos e oitenta e sete'
    t.is(numberAsText(number, true), writtenForm)
});

test('Should return the written form of 123456789', async t => {
    const number = paddNumber('123456789', 0)
    const writtenForm = 'cento e vinte e três milhões e quatrocentos e cinquenta e seis mil e setecentos e oitenta e nove'
    t.is(numberAsText(number, true), writtenForm)
});

test('Should return the written form of -9003438936774', async t => {
    const number = paddNumber('-9003438936774', 2)
    const writtenForm = 'menos nove trilhões e três bilhões e quatrocentos e trinta e oito milhões e novecentos e trinta e seis mil e setecentos e setenta e quatro'
    t.is(numberAsText(number, true), writtenForm)
});

test('Should return the written form of -100', async t => {
    const number = paddNumber('-100', 0)
    const writtenForm = 'menos cem'
    t.is(numberAsText(number, true), writtenForm)
});

test('Should return the written form of 2042', async t => {
    const number = paddNumber('2042', 2)
    const writtenForm = 'dois mil e quarenta e dois'
    t.is(numberAsText(number, true), writtenForm)
});

test('Should return the written form of 999888777555', async t => {
    const number = paddNumber('999888777555', 0)
    const writtenForm = 'novecentos e noventa e nove bilhões e oitocentos e oitenta e oito milhões e setecentos e setenta e sete mil e quinhentos e cinquenta e cinco'
    t.is(numberAsText(number, true), writtenForm)
});