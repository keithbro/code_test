#!/usr/bin/env node

const moment = require('moment')
const { getCompensationForWeek, parsePeopleJSON, parseRulesJSON } = require('../lib/calculator')

Promise.all(
  [
    parsePeopleJSON('./test/data/people.json'),
    parseRulesJSON('./test/data/rules.json'),
  ]
).then((peopleAndRules) => {
  const [ people, rules ] = peopleAndRules
  people.forEach((person) => {
    const compensation = getCompensationForWeek(person, moment(), rules).toString()
    console.log(`${person.name} will get paid $${compensation} this week`)
  })
})

