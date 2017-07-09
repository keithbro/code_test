'use strict'

const {
  calculateCompensationForDate,
  dateFormat,
} = require('../lib/calculator')

const assert = require('assert')
const moment = require('moment')
const Big = require('big.js')

const date = moment('2017/07/07', dateFormat)

const personA = {
  injuryDate: moment('2017/06/01', dateFormat),
  normalHours: 39.5,
  hourlyRate: Big(54.8723),
  overtimeHours: 9.25,
  overtimeRate: Big(123.456789),
}

const personB = {
  injuryDate: moment('2016/06/01', dateFormat),
  normalHours: 39.5,
  hourlyRate: Big(54.8723),
  overtimeHours: 9.25,
  overtimeRate: Big(123.456789),
}

const rules = [
  {
    applicableWeeks: { first: 1, last: 10 },
    overtimeIncluded: true,
    percentagePayable: 75,
  },
  {
    applicableWeeks: { first: 11 },
    overtimeIncluded: false,
    percentagePayable: 25,
  },
]

describe('calculateCompensationForDate', () => {
  /**
   * ( ( 54.8723 * 39.5 ) + ( 9.25 * 123.456789 ) ) * 0.75
   * (     2167.45585     +    1141.97529825      ) * 0.75
   * (               3309.43114825                ) * 0.75
   *                    2482.0733611875
   */

  it('should calculate the compensation for personA, first rule', () => {
    assert.strictEqual(
      calculateCompensationForDate(personA, date, rules).toString(),
      "2482.0733611875"
    )
  })

  /**
   * ( 54.8723 * 39.5 ) * 0.25
   * (   2167.45585   ) * 0.25
   *        541.8639625
   */

  it('should calculate the compensation for personB, second rule', () => {
    assert.strictEqual(
      calculateCompensationForDate(personB, date, rules).toString(),
      "541.8639625"
    )
  })
})

