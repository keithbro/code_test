'use strict'

const moment = require('moment')
const R = require('ramda')
const fs = require('fs')
const Big = require('big.js')

const parseJSONFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

const dateFormat = 'YYYY/MM/DD'

const getNormalPayment = (person) => {
  return person.hourlyRate.times(person.normalHours)
}

const getOvertimePayment = (person) => {
  return person.overtimeRate.times(person.overtimeHours)
}

const getNormalCompensation = (person, rule) => {
  return getNormalPayment(person).times(rule.percentagePayable / 100)
}

const getOvertimeCompensation = (person, rule) => {
  return rule.overtimeIncluded ?
    getOvertimePayment(person).times(rule.percentagePayable / 100) :
    Big(0)
}

module.exports = {
  dateFormat,
  getNormalPayment,
  getOvertimePayment,

  getWeek: (injuryDate, date) => {
    if (date < injuryDate) throw 'injuryDate cannot be in the future'

    return date.diff(injuryDate, 'weeks') + 1
  },

  getRule: (rules, week) => {
    const isRuleApplicable = (rule) => {
      return rule.lastApplicableWeek === undefined ||
        week <= rule.lastApplicableWeek;
    }
    return R.find(isRuleApplicable, rules)
  },

  getCompensation: (person, rule) => {
    return getNormalCompensation(person, rule)
      .plus(getOvertimeCompensation(person, rule))
  },

  parsePeopleJSON: (path) => {
    const transformations = {
      hourlyRate: Big,
      injuryDate: (injuryDate) => moment(injuryDate, dateFormat),
      overtimeRate: Big,
    };
    return parseJSONFile(path)
      .then(R.prop('people'))
      .then(R.map(R.evolve(transformations)))
  },

  parseRulesJSON: (path) => {
    const splitApplicableWeeks = (applicableWeeks) => {
      const firstAndLast =
        applicableWeeks.replace('+', '').split('-').map(Number)

      return {
        first: firstAndLast[0],
        last: firstAndLast[1],
      }
    }

    const transformations = {
      applicableWeeks: splitApplicableWeeks,
    }

    return parseJSONFile(path)
      .then(R.prop('rules'))
      .then(R.map(R.evolve(transformations)))
  },
}
