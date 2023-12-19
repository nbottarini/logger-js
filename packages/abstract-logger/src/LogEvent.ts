import { Levels } from './Levels'

export interface LogEvent {
    readonly dateTime: Date
    readonly category: string
    readonly level: Levels
    readonly data: any[]
    readonly context: Record<string, any>
}
