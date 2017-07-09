'use strict'

const assert = require('assert')

const {
  findApplicableRule,
  parseRulesJSON,
} = require('../lib/calculator')

parseRulesJSON('./test/data/rules.json')
  .then((rules) => {
    const testCases = [
      { week: 1, rule: rules[0] },
      { week: 12, rule: rules[0] },
      { week: 26, rule: rules[0] },
      { week: 27, rule: rules[1] },
      { week: 53, rule: rules[2] },
      { week: 80, rule: rules[3] },
      { week: 104, rule: rules[3] },
      { week: 1040, rule: rules[4] },
    ];

    describe('findApplicableRule', () => {
      testCases.forEach((testCase) => {
        it(`should return the correct rule for weekNumber ${testCase.week}`, () => {
          assert.strictEqual(
            findApplicableRule(rules, testCase.week),
            testCase.rule
          )
        })
      })
    })
  })
