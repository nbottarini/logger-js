import { Levels } from './Levels'

export interface Logger {
    readonly level: Levels
    readonly category: string

    log(level: Levels, ...args: any): void
    trace(...args: any): void
    debug(...args: any): void
    info(...args: any): void
    warn(...args: any): void
    error(...args: any): void
    fatal(...args: any): void

    addContext(key: string, value: any): void
    removeContext(key: string): void
    clearContext(): void
}
