import { Levels, Logger } from '@nbottarini/abstract-logger'

export class NullLogger implements Logger {
    category: string = 'default'

    level: Levels = Levels.INFO

    log(level: Levels, ...args: any): void {}

    trace(...args: any): void {}

    debug(...args: any): void {}

    info(...args: any): void {}

    warn(...args: any): void {}

    error(...args: any): void {}

    fatal(...args: any): void {}

    addContext(key: string, value: any): void {}

    removeContext(key: string): void {}

    clearContext(): void {}
}
