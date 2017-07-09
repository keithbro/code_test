#!/usr/bin/env node

const {
  calculateCompensationForDate,
  parsePeopleJSON,
  parseRulesJSON,
} = require('../lib/calculator')

const moment = require('moment')

const now = moment()

Promise.all(
  [
    parsePeopleJSON('./test/data/people.json'),
    parseRulesJSON('./test/data/rules.json'),
  ]
).then((peopleAndRules) => {
  const [ people, rules ] = peopleAndRules
  people.forEach((person) => {
    console.log(person.name)
    for (date = person.injuryDate.clone(); date.diff(now) < 0; date.add(1, 'weeks')) {
      console.log(
        date.format('YYYY/MM/DD'),
        '$',
        calculateCompensationForDate(person, date, rules).toString()
      )
    }
  })
})

