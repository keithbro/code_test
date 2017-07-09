'use strict'

const assert = require('assert')
const moment = require('moment')

const {
  calculateWeekNumber,
  dateFormat,
} = require('../lib/calculator')

const injuryDate = moment('2016/12/24', dateFormat)

const testCases = [
  { date: '2016/12/24', expectedWeek: 1 },
  { date: '2016/12/30', expectedWeek: 1 },
  { date: '2016/12/31', expectedWeek: 2 },
  { date: '2017/01/01', expectedWeek: 2 },
  { date: '2018/01/01', expectedWeek: 54 },
  { date: '2018/06/01', expectedWeek: 75 },
];

describe('calculateWeekNumber', () => {
  testCases.forEach((testCase) => {
    it(`should return the correct weekNumber for ${testCase.date}`, () => {
      const date = moment(testCase.date, dateFormat)
      assert.strictEqual(
        calculateWeekNumber(injuryDate, date),
        testCase.expectedWeek
      )
    })
  })

  it('should throw an exception when given a date before the injury', () => {
    assert.throws(() => {
      calculator.calculateWeekNumber(injuryDate, injuryDate.clone().subtract(1, 'days'))
    })
  })

})


