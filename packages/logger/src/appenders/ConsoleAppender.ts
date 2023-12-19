import { Appender, Levels, LogEvent } from '@nbottarini/abstract-logger'
import { Formatter } from '../formatters/Formatter'
import { ColoredFormatter } from '../formatters/ColoredFormatter'

export class ConsoleAppender implements Appender {
    constructor(private formatter: Formatter = new ColoredFormatter()) {}

    log(event: LogEvent): void {
        const message = this.formatter.format(event)
        switch (event.level) {
            case Levels.TRACE:
            case Levels.DEBUG:
                console.debug(message)
                break
            case Levels.INFO:
            case Levels.WARN:
                console.log(message)
                break
            case Levels.ERROR:
            case Levels.FATAL:
                console.error(message)
        }
    }
}
