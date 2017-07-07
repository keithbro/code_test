'use strict'

const assert = require('assert')
const moment = require('moment')

const calculator = require('../lib/calculator')

const format = 'YYYY/MM/DD'
const injuryDate = moment('2016/12/24', format)

const testCases = [
  { date: '2016/12/24', expectedWeek: 1 },
  { date: '2016/12/30', expectedWeek: 1 },
  { date: '2016/12/31', expectedWeek: 2 },
  { date: '2017/01/01', expectedWeek: 2 },
  { date: '2018/01/01', expectedWeek: 54 },
  { date: '2018/06/01', expectedWeek: 75 },
];

describe('getWeek', () => {
  it('should return the correct week', () => {
    testCases.forEach((testCase) => {
      const date = moment(testCase.date, format)
      assert.equal(calculator.getWeek(injuryDate, date), testCase.expectedWeek)
    })
  })

  it('should throw an exception when given a date before the injury', () => {
    assert.throws(() => {
      calculator.getWeek(injuryDate, injuryDate.clone().subtract(1, 'days'))
    })
  })

})


