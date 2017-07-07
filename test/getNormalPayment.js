'use strict'

const assert = require('assert')
const R = require('ramda')
const { parsePeopleJSON, getNormalPayment } = require('../calculator')

const expectedNormalPayments = [
  { name: "Ebony Boycott", normalPayment: "2625.105" },
  { name: "Geoff Rainford-Brent", normalPayment: "753.085" },
  { name: "Meg Gillespie", normalPayment: "1875" },
  { name: "Jason Lanning", normalPayment: "1600.22" },
]

const calculateNormalPayment = (person) => {
  return {
    name: person.name,
    normalPayment: getNormalPayment(person).toString(),
  }
}

parsePeopleJSON('./test/data/people.json')
  .then(R.map(calculateNormalPayment))
  .then((normalPayments) => {
    describe('getNormalPayment', () => {
      it('should...', () => {
        assert.deepStrictEqual(normalPayments, expectedNormalPayments)
      })
    })
  })
