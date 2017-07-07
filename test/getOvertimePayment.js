'use strict'

const assert = require('assert')
const R = require('ramda')
const { getOvertimePayment, parsePeopleJSON } = require('../calculator')

const expectedOvertimePayments = [
  { name: "Ebony Boycott", overtimePayment: "1095" },
  { name: "Geoff Rainford-Brent", overtimePayment: "645.69792" },
  { name: "Meg Gillespie", overtimePayment: "0" },
  { name: "Jason Lanning", overtimePayment: "1128.24624" },
]

const calculateOvertimePayment = (person) => {
  return {
    name: person.name,
    overtimePayment: getOvertimePayment(person).toString(),
  }
}

parsePeopleJSON('./test/data/people.json')
  .then(R.map(calculateOvertimePayment))
  .then((overtimePayments) => {
    describe('getOvertimePayment', () => {
      it('should...', () => {
        assert.deepStrictEqual(overtimePayments, expectedOvertimePayments)
      })
    })
  })

