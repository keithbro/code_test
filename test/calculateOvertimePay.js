'use strict'

const assert = require('assert')
const R = require('ramda')
const {
  calculateOvertimePay,
  parsePeopleJSON,
} = require('../lib/calculator')

const expectedOvertimePayments = [
  { name: "Ebony Boycott", overtimePayment: "1095" },
  { name: "Geoff Rainford-Brent", overtimePayment: "645.69792" },
  { name: "Meg Gillespie", overtimePayment: "0" },
  { name: "Jason Lanning", overtimePayment: "1128.24624" },
]

const calculateOvertimePayment = (person) => {
  return {
    name: person.name,
    overtimePayment: calculateOvertimePay(person).toString(),
  }
}

parsePeopleJSON('./test/data/people.json')
  .then(R.map(calculateOvertimePayment))
  .then((overtimePayments) => {
    describe('calculateOvertimePay', () => {
      it('should...', () => {
        assert.deepStrictEqual(overtimePayments, expectedOvertimePayments)
      })
    })
  })

