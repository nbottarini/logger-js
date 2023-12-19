import { LogEvent } from '@nbottarini/abstract-logger'

export interface Formatter {
    format(event: LogEvent): string
}
