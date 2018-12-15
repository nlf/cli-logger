'use strict'

const colors = require('./colors')
const time = require('./time')

const dateformat = require('dateformat')
const prettyMs = require('pretty-ms')
const util = require('util')

const levels = ['debug', 'info', 'warn', 'error']
const levelMap = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}
const padMap = {
  debug: '',
  info: ' ',
  warn: ' ',
  error: ''
}

class Logger {
  constructor ({ name, level = 'info', format = 'HH:MM:ss.l', hrtime = false } = {}) {
    this.name = name
    this.color = colors.pick()
    this.timerOptions = hrtime ? { separateMs: true, msDecimalDigits: 3 } : {}
    this.timerClass = time.getTimerClass(hrtime)
    this.timers = new Map()
    this.counters = new Map()
    this.level = levels.includes(level) ? levels.indexOf(level) : 1
    this.format = format
  }

  _display (level, ...args) {
    if (this.level > levelMap[level]) {
      return
    }
    console[levelMap[level] > 1 ? 'error' : 'log'](`%s%s %s%s%s %s%s`, colors.plain('['), colors.plain(this._timestamp()), padMap[level], colors[level](level.toUpperCase()), colors.plain(']'), this.name ? colors[this.color](`${this.name}: `) : '', util.format(...args))
  }

  _timestamp () {
    return dateformat(new Date(), this.format)
  }

  debug (...args) {
    this._display('debug', ...args)
  }

  info (...args) {
    this._display('info', ...args)
  }

  warn (...args) {
    this._display('warn', ...args)
  }

  error (...args) {
    this._display('error', ...args)
  }

  time (id, level = 'debug') {
    this.timers.set(id, new this.timerClass())
    this._display(level, 'started', id)
  }

  timeEnd (id, level = 'info') {
    if (!this.timers.has(id)) {
      return
    }

    const timer = this.timers.get(id)
    this._display(level, 'finished %s in %s', id, prettyMs(timer.elapsed(), this.timerOptions))
    this.timers.delete(id)
  }

  count (id, level = 'info') {
    const fullId = `${id}.${level}`
    const count = this.counters.has(fullId) ? this.counters.get(fullId) + 1 : 1
    this.counters.set(fullId, count)
    this._display(level, '%s #%d', id, count)
  }
}

module.exports = Logger
