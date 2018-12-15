'use strict'

const chalk = require('chalk')

const availableColors = [
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan'
]

const usedColors = []

// pick a random color from the availableColors array, try not to repeat yourself
function pick () {
  const color = availableColors[Math.floor(Math.random() * availableColors.length)]

  if (!usedColors.includes(color)) {
    usedColors.push(color)
    return color
  }

  if (usedColors.length < availableColors.length) {
    return pick()
  }
  return color
}

module.exports = {
  pick,

  red: chalk.red,
  green: chalk.green,
  yellow: chalk.yellow,
  blue: chalk.blue,
  magenta: chalk.magenta,
  cyan: chalk.cyan,

  plain: chalk.gray,
  debug: chalk.white,
  info: chalk.blue,
  warn: chalk.yellow,
  error: chalk.red
}
