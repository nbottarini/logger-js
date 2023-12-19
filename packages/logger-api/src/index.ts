import { LoggerFactoryFunc } from '@nbottarini/abstract-logger'
import { NullLogger } from './NullLogger'

function getRealLoggerOrNull() {
    try {
        return require('@nbottarini/logger')
    } catch (e) {
        return null
    }
}

const logger = getRealLoggerOrNull()

export const getLogger: LoggerFactoryFunc = logger ? logger.getLogger : () => new NullLogger()
