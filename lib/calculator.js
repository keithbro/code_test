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

/**
 * Calculate a person's normal weekly pay for their normal hours.
 * @param person
 * @returns a Big number instance
 */
const calculateNormalPay = (person) => {
  return person.hourlyRate.times(person.normalHours)
}

/**
 * Calculate a person's normal weekly pay for their overtime hours.
 * @param person
 * @returns a Big number instance
 */
const calculateOvertimePay = (person) => {
  return person.overtimeRate.times(person.overtimeHours)
}

/**
 * Calculate the normal component of a person's weekly compensation given a
 * rule that should be applied.
 * @param person
 * @param rule
 * @returns a Big number instance
 */
const calculateNormalCompensation = (person, rule) => {
  return calculateNormalPay(person).times(rule.percentagePayable / 100)
}

/**
 * Calculate the overtime component of a person's weekly compensation given a
 * rule that should be applied.
 * @param person
 * @param rule
 * @returns a Big number instance
 */
const calculateOvertimeCompensation = (person, rule) => {
  return rule.overtimeIncluded ?
    calculateOvertimePay(person).times(rule.percentagePayable / 100) :
    Big(0)
}

/**
 * Calculate the week number of a given date since a given injuryDate.
 * @param injuryDate - a Moment instance
 * @param date - a Moment instance
 * @returns a Moment instance
 */
const calculateWeekNumber = (injuryDate, date) => {
  if (date < injuryDate) throw 'injuryDate cannot be in the future'
  return date.diff(injuryDate, 'weeks') + 1
}

/**
 * Find the rule that should be applied for the given weekNumber.
 * @param rules
 * @param weekNumber
 * @returns a rule object
 */
const findApplicableRule = (rules, weekNumber) => {
  const isRuleApplicable = (rule) => {
    return rule.applicableWeeks.last === undefined ||
      weekNumber <= rule.applicableWeeks.last;
  }
  return R.find(isRuleApplicable, rules)
}

/**
 * Calculate the weekly compensation that should be paid to a person for a
 * given rule.
 * @param person
 * @param rule
 * @returns a Big number instance
 */
const calculateCompensation = (person, rule) => {
  return calculateNormalCompensation(person, rule)
    .plus(calculateOvertimeCompensation(person, rule))
}

/**
 * Calculate the weekly compensation that should be paid to a person for a
 * given date.
 * @param person
 * @param date - a Moment instance
 * @param rules
 * @returns a Big number instance
 */
const calculateCompensationForDate = (person, date, rules) => {
  const weekNumber = calculateWeekNumber(person.injuryDate, date)
  const applicableRule = findApplicableRule(rules, weekNumber)
  return calculateCompensation(person, applicableRule)
}

/**
 * Parse a given JSON file that contains person data.
 * @param file path
 * @returns Array
 */
const parsePeopleJSON = (path) => {
  const transformations = {
    hourlyRate: Big,
    injuryDate: (injuryDate) => moment(injuryDate, dateFormat),
    overtimeRate: Big,
  };

  return parseJSONFile(path)
    .then(R.prop('people'))
    .then(R.map(R.evolve(transformations)))
}

/**
 * Parse a given JSON file that contains rule data.
 * @param file path
 * @returns Array
 */
const parseRulesJSON = (path) => {
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
}

module.exports = {
  calculateCompensation,
  calculateCompensationForDate,
  calculateNormalPay,
  calculateOvertimePay,
  calculateWeekNumber,
  dateFormat,
  findApplicableRule,
  parseRulesJSON,
  parsePeopleJSON,
}
