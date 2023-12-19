import { Appender, canLogLevel, Levels, LogEvent, Logger } from '@nbottarini/abstract-logger'

export class DefaultLogger implements Logger {
    private context: Record<string, any> = {}

    constructor(readonly category: string = 'default', readonly level: Levels|null, readonly appenders: Appender[]) {}

    log(level: Levels, ...args: any): void {
        if (!canLogLevel(level, this.level)) return
        const event: LogEvent = {
            dateTime: new Date(),
            category: this.category,
            level,
            data: args,
            context: this.context,
        }
        this.appenders.forEach(it => {
            it.log(event)
        })
    }

    trace(...args: any): void {
        this.log(Levels.TRACE, ...args)
    }

    debug(...args: any): void {
        this.log(Levels.DEBUG, ...args)
    }

    info(...args: any): void {
        this.log(Levels.INFO, ...args)
    }

    warn(...args: any): void {
        this.log(Levels.WARN, ...args)
    }

    error(...args: any): void {
        this.log(Levels.ERROR, ...args)
    }

    fatal(...args: any): void {
        this.log(Levels.FATAL, ...args)
    }

    addContext(key: string, value: any): void {
        this.context[key] = value
    }

    removeContext(key: string): void {
        delete this.context[key]
    }

    clearContext(): void {
        this.context = {}
    }
}
