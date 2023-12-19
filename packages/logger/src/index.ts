import { LoggerManager } from './LoggerManager'

export * from '@nbottarini/abstract-logger'

export * from './appenders/ConsoleAppender'
export * from './formatters/BasicFormatter'
export * from './formatters/ColoredFormatter'
export * from './formatters/Formatter'
export * from './formatters/utils'

const loggerManager = new LoggerManager()
export default loggerManager
