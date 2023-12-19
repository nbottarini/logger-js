import loggerManager, { ConsoleAppender, Levels } from '@nbottarini/logger'
import { getLogger } from '@nbottarini/logger-api'

const loggerFromApi = getLogger('category')
loggerFromApi.info('LOG FROM API')

loggerManager.configure({
    appenders: {
        console: new ConsoleAppender()
    },
    categories: {
        default: { appenders: ['console'], level: Levels.TRACE }
    }
})

class App {
    private logger = loggerManager.getLogger(App)

    run() {
        this.logger.trace('Some trace message')
        this.logger.debug('Some warn message')
        this.logger.info('Some info message')
        this.logger.warn('Some warn message')
        this.logger.error('Some error message')
        this.logger.fatal('Some fatal message')
        this.logger.info()
        this.logger.info({ some: 'object' })
        this.logger.info(null)
        this.logger.info(true)
        this.logger.info(new Date())
        this.logger.info([1, 2, { object: 'in-array' }])
    }
}

(new App()).run()
