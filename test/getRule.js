'use strict'

const assert = require('assert')

const calculator = require('../calculator')

const rules = [
  {"lastApplicableWeek": 25, "percentagePayable": 90, "overtimeIncluded": true},
  {"lastApplicableWeek": 51, "percentagePayable": 80, "overtimeIncluded": true},
  {"lastApplicableWeek": 78, "percentagePayable": 70, "overtimeIncluded": true},
  {"lastApplicableWeek": 103, "percentagePayable": 60, "overtimeIncluded": false},
  {"percentagePayable": 10, "overtimeIncluded": false}
];

const testCases = [
  { week: 1, rule: rules[0] },
  { week: 12, rule: rules[0] },
  { week: 25, rule: rules[0] },
  { week: 26, rule: rules[1] },
  { week: 53, rule: rules[2] },
  { week: 80, rule: rules[3] },
  { week: 104, rule: rules[4] },
  { week: 1040, rule: rules[4] },
];

describe('getRule', () => {
  it('should return the correct rule', () => {
    testCases.forEach((testCase) => {
      assert.equal(calculator.getRule(rules, testCase.week), testCase.rule)
    })
  })
})
