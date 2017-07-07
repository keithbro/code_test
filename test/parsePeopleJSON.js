'use strict'

const assert = require('assert')
const moment = require('moment')
const Big = require('Big.js')

const { parsePeopleJSON, dateFormat } = require('../lib/calculator');

parsePeopleJSON('./test/data/people.json').then((people) => {
  describe('parsePeopleJSON', () => {
    it('should parse all people in the file', () => {
      assert.strictEqual(people.length, 4)
    })

    it('should parse the date as a moment object', () => {
      assert.strictEqual(
        people[0].injuryDate.diff(moment("2016/05/01", dateFormat)), 0
      )
    })


    it('should treat the rates a big decimals', () => {
      assert.equal(people[0].hourlyRate.toString(), '75.003')
      assert.strictEqual(people[0].hourlyRate.constructor.name, 'Big')

      assert.equal(people[0].overtimeRate.toString(), '150')
      assert.strictEqual(people[0].overtimeRate.constructor.name, 'Big')
    })

    it('should parse the other fields', () => {
      assert.strictEqual(people[0].name, "Ebony Boycott")
      assert.strictEqual(people[0].normalHours, 35)
      assert.strictEqual(people[0].overtimeHours, 7.3)
    })
  })
})
