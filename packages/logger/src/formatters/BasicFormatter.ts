import { LogEvent } from '@nbottarini/abstract-logger'
import { Formatter } from './Formatter'
import { dataToString } from './dataToString'
import dateFormat from 'date-format'

export class BasicFormatter implements Formatter {
    constructor(private timestampFormat: string = dateFormat.ISO8601_FORMAT) {}

    format(event: LogEvent): string {
        const stringData = event.data.map(it => dataToString(it)).join(' ')
        const timestamp = dateFormat.asString(this.timestampFormat, event.dateTime)
        return `[${timestamp}] [${event.level}] ${event.category} - ${stringData}`
    }

    static fullDate() {
        return new BasicFormatter(dateFormat.ISO8601_FORMAT)
    }

    static onlyTime() {
        return new BasicFormatter('hh:mm:ss.SSS')
    }
}
