'use strict'

class Timer {
  constructor () {
    this.start = Date.now()
  }

  elapsed () {
    return Date.now() - this.start
  }
}

class HighResTimer {
  constructor () {
    this.start = process.hrtime()
  }

  elapsed () {
    const diff = process.hrtime(this.start)
    return (diff[0] * 1000) + (diff[1] / 1000000)
  }
}

class BigIntTimer {
  constructor () {
    this.start = process.hrtime.bigint()
  }

  elapsed () {
    return Number((process.hrtime.bigint() - this.start) / BigInt(1000000))
  }
}

exports.getTimerClass = function (hrtime) {
  if (hrtime) {
    if (process.hrtime.hasOwnProperty('bigint')) {
      return BigIntTimer
    }
    return HighResTimer
  }

  return Timer
}
