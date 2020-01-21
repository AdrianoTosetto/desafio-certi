const { numberAsText } = require('../models/numbers')
const { zip, paddNumber, removeSign } = require('../utils/util')
const ERRORS = Object.freeze({"NUMBER_INVALID_FORMAT": 1})

module.exports = {
	extenso: (req, res) => {
		let { number } = req.params
		if (!/^-?\d\d*$/.test(number))
			return res.json({
				ok: false,
				error: 'Invalid format',
				errorType: ERRORS.NUMBER_INVALID_FORMAT
			})
		let padding = 0
		const digitisLen = removeSign(number).length
		if (digitisLen % 3 !== 0)
			padding = 3 - (digitisLen % 3)
		const padded = paddNumber(number, padding) // 23 becomes 023, -12389 becomes -012389 and so on
		return res.json({
			ok: true,
			extenso: numberAsText(padded)
		})
	}
}