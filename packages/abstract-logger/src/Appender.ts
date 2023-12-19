import { LogEvent } from './LogEvent'

export interface Appender {
    log(event: LogEvent): void
}
