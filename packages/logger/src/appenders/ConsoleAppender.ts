import { Appender, Levels, LogEvent } from '@nbottarini/abstract-logger'
import { Formatter } from '../formatters/Formatter'
import { ColoredFormatter } from '../formatters/ColoredFormatter'

export class ConsoleAppender implements Appender {
    constructor(private formatter: Formatter = ColoredFormatter.onlyTime()) {}

    log(event: LogEvent): void {
        const message = this.formatter.format(event)
        switch (event.level) {
            case Levels.TRACE:
                console.trace(message)
                break
            case Levels.DEBUG:
                console.debug(message)
                break
            case Levels.INFO:
                console.log(message)
                break
            case Levels.WARN:
                console.warn(message)
                break
            case Levels.ERROR:
            case Levels.FATAL:
                console.error(message)
        }
    }
}
