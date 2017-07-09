'use strict'

const assert = require('assert')
const R = require('ramda')

const {
  calculateCompensation,
  parsePeopleJSON,
  parseRulesJSON,
} = require('../lib/calculator')

const transformCompensation = (acc, combination) => {
  const [ person, rule ] = combination
  return R.assocPath(
    [ person.name, String(rule.applicableWeeks.first) ],
    calculateCompensation(person, rule).toString(),
    acc
  )
}

const expectedCompensations = {
  "Ebony Boycott": {
    "1": "3348.0945",
    "26": "2976.084",
    "53": "2604.0735",
    "80": "1575.063",
    "104": "262.5105",
  },
  "Geoff Rainford-Brent": {
    "1": "1258.904628",
    "26": "1119.026336",
    "53": "979.148044",
    "80": "451.851",
    "104": "75.3085",
  },
  "Jason Lanning": {
    "1": "2455.619616",
    "26": "2182.772992",
    "53": "1909.926368",
    "80": "960.132",
    "104": "160.022",
  },
  "Meg Gillespie": {
    "1": "1687.5",
    "26": "1500",
    "53": "1312.5",
    "80": "1125",
    "104": "187.5",
  },
}

Promise.all(
  [
    parsePeopleJSON('./test/data/people.json'),
    parseRulesJSON('./test/data/rules.json'),
  ]
)
  .then((parsedJSON) => R.xprod(...parsedJSON))
  .then(R.reduce(transformCompensation, { }))
  .then((compensations) => {
    describe('calculateCompensation', () => {
      it('should...', () => {
        assert.deepStrictEqual(compensations, expectedCompensations)
      })
    })
  })

