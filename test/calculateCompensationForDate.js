'use strict'

const {
  calculateCompensationForDate,
  dateFormat,
} = require('../lib/calculator')

const assert = require('assert')
const moment = require('moment')
const Big = require('big.js')

const date = moment('2017/07/07', dateFormat)

const person = {
  injuryDate: moment('2017/06/01', dateFormat),
  normalHours: 39.5,
  hourlyRate: Big(54.8723),
}

const rules = [
  { applicableWeeks: { first: 1, last: 10 }, percentagePayable: 75 },
  { applicableWeeks: { first: 11 }, percentagePayable: 25 },
]

describe('calculateCompensationForDate', () => {
  it('should return the compensation for a given week', () => {
    assert.strictEqual(
      calculateCompensationForDate(person, date, rules).toString(),
      "1625.5918875"
    )
  })
})

