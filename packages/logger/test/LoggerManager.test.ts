import { Configuration, Levels } from '@nbottarini/abstract-logger'
import { LoggerManager } from '../src/LoggerManager'
import { FakeAppender } from './FakeAppender'

describe('getLogger', () => {
    test('returns logger for default category if not provided', () => {
        const logger = loggerManager.getLogger()

        expect(logger.category).toEqual('default')
    })

    test('returns logger for given string category', () => {
        const logger = loggerManager.getLogger('my-category')

        expect(logger.category).toEqual('my-category')
    })

    test('returns logger for given class category', () => {
        const logger = loggerManager.getLogger(SomeClass)

        expect(logger.category).toEqual('SomeClass')
    })

    test('returns logger with directly configured level', () => {
        loggerManager.configure({
            ...someConfig,
            categories: {
                category1: { level: Levels.WARN },
                category2: { level: Levels.DEBUG },
            }
        })

        const logger = loggerManager.getLogger('category1')

        expect(logger.level).toEqual(Levels.WARN)
    })

    test('returns logger with default configured level', () => {
        loggerManager.configure({
            ...someConfig,
            categories: {
                default: { level: Levels.WARN },
                category2: { level: Levels.DEBUG },
            }
        })

        const logger = loggerManager.getLogger('category1')

        expect(logger.level).toEqual(Levels.WARN)
    })

    test('returns null if no default category', () => {
        loggerManager.configure({
            ...someConfig,
            categories: {
                category2: { level: Levels.DEBUG },
            }
        })

        const logger = loggerManager.getLogger('category1')

        expect(logger.level).toBeNull()
    })

    test('returns logger with hierarchical configured level', () => {
        loggerManager.configure({
            ...someConfig,
            categories: {
                default: { level: Levels.WARN },
                'category1': { level: Levels.TRACE },
                'category1.category1_1': { level: Levels.DEBUG },
                category2: { level: Levels.FATAL },
            }
        })

        expect(loggerManager.getLogger('category1').level).toEqual(Levels.TRACE)
        expect(loggerManager.getLogger('category1.category1_1').level).toEqual(Levels.DEBUG)
        expect(loggerManager.getLogger('category1.category1_1.category1_2').level).toEqual(Levels.DEBUG)
        expect(loggerManager.getLogger('category2').level).toEqual(Levels.FATAL)
        expect(loggerManager.getLogger('category2.category2_1').level).toEqual(Levels.FATAL)
        expect(loggerManager.getLogger('category2.category2_1.category2_2').level).toEqual(Levels.FATAL)
    })

    test('when level is not defined it returns next level in hierarchy', () => {
        loggerManager.configure({
            ...someConfig,
            categories: {
                'category1': { level: Levels.TRACE },
                'category1.category1_1': { },
            }
        })

        expect(loggerManager.getLogger('category1.category1_1').level).toEqual(Levels.TRACE)
    })

    test('returns logger with directly configured appenders', () => {
        const appender1 = new FakeAppender()
        const appender2 = new FakeAppender()
        const appender3 = new FakeAppender()
        loggerManager.configure({
            appenders: { appender1, appender2, appender3 },
            categories: {
                category1: { appenders: ['appender1', 'appender3'], level: Levels.INFO },
                category2: { appenders: ['appender2'] },
            }
        })
        const logger = loggerManager.getLogger('category1')

        logger.info('Some message')

        expect(appender1.called).toBeTrue()
        expect(appender2.called).toBeFalse()
        expect(appender3.called).toBeTrue()
    })

    test('returns logger with inherited appenders', () => {
        const appender1 = new FakeAppender()
        const appender2 = new FakeAppender()
        const appender3 = new FakeAppender()
        loggerManager.configure({
            appenders: { appender1, appender2, appender3 },
            categories: {
                'category1': { appenders: ['appender1', 'appender3'], level: Levels.INFO },
                'category1.category1_1': { appenders: ['appender2'], level: Levels.INFO },
                'category1.category1_1.category1_2': { level: Levels.INFO },
            }
        })
        const logger = loggerManager.getLogger('category1.category1_1.category1_2')

        logger.info('Some message')

        expect(appender1.called).toBeTrue()
        expect(appender2.called).toBeTrue()
        expect(appender3.called).toBeTrue()
    })

    test('returns logger with direct and inherited appenders', () => {
        const appender1 = new FakeAppender()
        const appender2 = new FakeAppender()
        const appender3 = new FakeAppender()
        loggerManager.configure({
            appenders: { appender1, appender2, appender3 },
            categories: {
                'category1': { appenders: ['appender1', 'appender3'], level: Levels.INFO },
                'category1.category1_1': { level: Levels.INFO },
                'category1.category1_1.category1_2': { appenders: ['appender2'], level: Levels.INFO },
            }
        })
        const logger = loggerManager.getLogger('category1.category1_1.category1_2')

        logger.info('Some message')

        expect(appender1.called).toBeTrue()
        expect(appender2.called).toBeTrue()
        expect(appender3.called).toBeTrue()
    })


    test('inherit appenders from default', () => {
        const appender1 = new FakeAppender()
        const appender2 = new FakeAppender()
        const appender3 = new FakeAppender()
        loggerManager.configure({
            appenders: { appender1, appender2, appender3 },
            categories: {
                default: { appenders: ['appender1', 'appender3'], level: Levels.INFO },
                'category1.category1_1': { level: Levels.INFO },
                'category1.category1_1.category1_2': { level: Levels.INFO },
            }
        })
        const logger = loggerManager.getLogger('category1.category1_1.category1_2')

        logger.info('Some message')

        expect(appender1.called).toBeTrue()
        expect(appender2.called).toBeFalse()
        expect(appender3.called).toBeTrue()
    })
})

class SomeClass {}

beforeEach(() => {
    loggerManager = new LoggerManager()
})

let loggerManager: LoggerManager
const appender1 = new FakeAppender()
const appender2 = new FakeAppender()
const appender3 = new FakeAppender()

const someConfig: Configuration = {
    appenders: { appender1, appender2, appender3 },
    categories: {
        default: { appenders: ['appender1'], level: Levels.INFO }
    }
}
