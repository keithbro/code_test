'use strict'

const assert = require('assert')
const R = require('ramda')
const {
  calculateNormalPay,
  parsePeopleJSON,
} = require('../lib/calculator')

const expectedNormalPayForPerson = {
  "Ebony Boycott": "2625.105",
  "Geoff Rainford-Brent": "753.085",
  "Meg Gillespie": "1875",
  "Jason Lanning": "1600.22",
}

parsePeopleJSON('./test/data/people.json')
  .then((people) => {
    describe('calculateNormalPay', () => {
      people.forEach((person) => {
        it(`should calculate the correct pay for ${person.name}`, () => {
          const normalPay = calculateNormalPay(person).toString()
          assert.strictEqual(normalPay, expectedNormalPayForPerson[person.name])
        })
      })
    })
  })

