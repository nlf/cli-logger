### cli-logger

This is a small logger that I wrote for usage in my own cli tools. It's pretty much meant to fit my needs and that's it. If it's useful for you too, awesome.

### API

#### `new Logger({ name, level, format })`

Create a new logger instance. The options are as follows:

- `name`: if provided, this will log as part of each entry made by this logger instance. This is mostly useful if you have multiple sources of logs in your app and want them to be distinguished from each other.
- `level`: the minimum level that log entries must match before they're actually printed. the default is `'info'` and may be set to one of `'debug'`, `'info`', `'warn'`, or `'error'`
- `format`: the format to print the timestamp in, this is passed directly to [dateformat](https://github.com/felixge/node-dateformat) and defaults to `'HH:MM:ss.l'`.
- `hrtime`: measure timers using `process.hrtime()` (or `process.hrtime.bigint()` if available) and print more detailed time strings, defaults to `false`

#### `logger.debug()`, `logger.info()`, `logger.warn()`, `logger.error()`

Log an entry with the given level. Arguments are passed directly to [util.format]() and prepended with a timestamp, the level as a string, and if provided your logger's name.

#### `logger.count(id, level)`

Log a count of an entry. Any log line that is given the same `id` will increment the count and print both the `id` and the number of times that id (at the same level) has been called. The `level` parameter is optional and defaults to `'info'`.

#### `logger.time(id, level)`

Start a timer with the given `id` (`level` is optional, and defaults to `'debug'`). A log entry will be printed at the given level with a message informing the user the timer has started.

#### `logger.timeEnd(id, level)`

End the timer with the given `id` (`level` is optional, and defaults to `'info'`). A log entry will be printed at the given level with a message informing the user the timer has finished, as well as how much time elapsed since the timer started. Note that unlike `logger.count()`, the `level` here does not need to match the `level` given to `logger.time()`.
