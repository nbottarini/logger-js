import { LoggerManager } from './LoggerManager'
import chalkInstance from 'chalk'

export * from '@nbottarini/abstract-logger'

export * from './appenders/ConsoleAppender'
export * from './formatters/BasicFormatter'
export * from './formatters/ColoredFormatter'
export * from './formatters/Formatter'
export * from './formatters/dataToString'

export type { Chalk } from 'chalk'
export const chalk = chalkInstance

const loggerManager = new LoggerManager()
export default loggerManager
