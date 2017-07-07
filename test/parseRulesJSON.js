'use strict'

const assert = require('assert')
const moment = require('moment')

const { parseRulesJSON, dateFormat } = require('../lib/calculator');

parseRulesJSON('./test/data/rules.json').then((rules) => {
  describe('parseRulesJSON', () => {
    it('should parse all rules in the file', () => {
      assert.strictEqual(rules.length, 5)
    })

    it('should parse the rule fields', () => {
      assert.deepStrictEqual(
        rules,
        [
          {
            applicableWeeks: {
              first: 1,
              last: 26,
            },
            overtimeIncluded: true,
            percentagePayable: 90,
          },
          {
            applicableWeeks: {
              first: 26,
              last: 52,
            },
            overtimeIncluded: true,
            percentagePayable: 80,
          },
          {
            applicableWeeks: {
              first: 53,
              last: 79,
            },
            overtimeIncluded: true,
            percentagePayable: 70,
          },
          {
            applicableWeeks: {
              first: 80,
              last: 104,
            },
            overtimeIncluded: false,
            percentagePayable: 60,
          },
          {
            applicableWeeks: {
              first: 104,
              last: undefined,
            },
            overtimeIncluded: false,
            percentagePayable: 10,
          },

        ]
      )
    })
  })
})

