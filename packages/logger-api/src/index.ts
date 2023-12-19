import { LoggerFactoryFunc } from '@nbottarini/abstract-logger'
import { NullLogger } from './NullLogger'

function getRealLoggerOrNull() {
    try {
        return require('@nbottarini/logger')
    } catch (e) {
        return null
    }
}

const loggerManager = getRealLoggerOrNull()?.default

export const getLogger: LoggerFactoryFunc = loggerManager ?
    loggerManager.getLogger.bind(loggerManager)
    :
    () => new NullLogger()
