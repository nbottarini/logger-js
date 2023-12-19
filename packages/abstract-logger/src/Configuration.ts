import { Levels } from 'dist/types'
import { Appender } from './Appender'

export interface Configuration {
    appenders: Record<string, Appender>
    categories: Record<string, CategoryConfiguration>
}

export interface CategoryConfiguration {
    appenders?: string[],
    level?: Levels|null,
}
