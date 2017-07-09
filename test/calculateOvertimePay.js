'use strict'

const assert = require('assert')
const R = require('ramda')
const {
  calculateOvertimePay,
  parsePeopleJSON,
} = require('../lib/calculator')

const expectedOvertimePayForPerson = {
  "Ebony Boycott": "1095",
  "Geoff Rainford-Brent": "645.69792",
  "Meg Gillespie": "0",
  "Jason Lanning": "1128.24624",
}

parsePeopleJSON('./test/data/people.json')
  .then((people) => {
    describe('calculateOvertimePay', () => {
      people.forEach((person) => {
        it(`should calculate the correct pay for ${person.name}`, () => {
          const overtimePay = calculateOvertimePay(person).toString()
          assert.strictEqual(overtimePay, expectedOvertimePayForPerson[person.name])
        })
      })
    })
  })

