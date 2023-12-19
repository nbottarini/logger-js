import { Appender, Levels, LogEvent } from '@nbottarini/abstract-logger'
import { DefaultLogger } from '../src/DefaultLogger'
import each from 'jest-each'
import { FakeAppender } from './FakeAppender'
import { anything, deepEqual, instance, mock, verify } from 'ts-mockito'

each([
    [Levels.TRACE, Levels.TRACE],
    [Levels.DEBUG, Levels.TRACE],
    [Levels.INFO, Levels.TRACE],
    [Levels.WARN, Levels.TRACE],
    [Levels.ERROR, Levels.TRACE],
    [Levels.FATAL, Levels.TRACE],
    [Levels.DEBUG, Levels.DEBUG],
    [Levels.INFO, Levels.DEBUG],
    [Levels.WARN, Levels.DEBUG],
    [Levels.ERROR, Levels.DEBUG],
    [Levels.FATAL, Levels.DEBUG],
    [Levels.INFO, Levels.INFO],
    [Levels.WARN, Levels.INFO],
    [Levels.ERROR, Levels.INFO],
    [Levels.FATAL, Levels.INFO],
    [Levels.WARN, Levels.WARN],
    [Levels.ERROR, Levels.WARN],
    [Levels.FATAL, Levels.WARN],
    [Levels.ERROR, Levels.ERROR],
    [Levels.FATAL, Levels.ERROR],
    [Levels.FATAL, Levels.FATAL],
]).test('logs levels above logger level', (logLevel, loggerLevel) => {
    const appender = new FakeAppender()
    const logger = new DefaultLogger('category1', loggerLevel, [appender])

    logger.log(logLevel, 'some message')

    expect(appender.called).toBeTrue()
})

each([
    [Levels.TRACE, Levels.FATAL],
    [Levels.DEBUG, Levels.FATAL],
    [Levels.INFO, Levels.FATAL],
    [Levels.WARN, Levels.FATAL],
    [Levels.ERROR, Levels.FATAL],
    [Levels.TRACE, Levels.ERROR],
    [Levels.DEBUG, Levels.ERROR],
    [Levels.INFO, Levels.ERROR],
    [Levels.WARN, Levels.ERROR],
    [Levels.TRACE, Levels.WARN],
    [Levels.DEBUG, Levels.WARN],
    [Levels.INFO, Levels.WARN],
    [Levels.TRACE, Levels.INFO],
    [Levels.DEBUG, Levels.INFO],
    [Levels.TRACE, Levels.DEBUG],
]).test('doesn\'t log levels below logger level', (logLevel, loggerLevel) => {
    const appender = new FakeAppender()
    const logger = new DefaultLogger('category1', loggerLevel, [appender])

    logger.log(logLevel, 'some message')

    expect(appender.called).toBeFalse()
})

each([
    Levels.TRACE,
    Levels.DEBUG,
    Levels.INFO,
    Levels.WARN,
    Levels.ERROR,
    Levels.FATAL,
]).test('doesn\'t log if level is null', (logLevel) => {
    const appender = new FakeAppender()
    const logger = new DefaultLogger('category1', null, [appender])

    logger.log(logLevel, 'some message')

    expect(appender.called).toBeFalse()
})

test('send log event with category name to each appender', () => {
    const appender1 = mock<Appender>()
    const appender2 = mock<Appender>()
    const logger = new DefaultLogger('category1', Levels.TRACE, [instance(appender1), instance(appender2)])
    const expectedEvent: LogEvent = {
        dateTime: anything(),
        category: 'category1',
        level: anything(),
        context: anything(),
        data: anything(),
    }

    logger.log(Levels.INFO, 'some', 'message', { and: 'object' })

    verify(appender1.log(deepEqual(expectedEvent))).called()
    verify(appender1.log(deepEqual(expectedEvent))).called()
})

test('send log event with log level to each appender', () => {
    const appender = mock<Appender>()
    const logger = new DefaultLogger('category1', Levels.TRACE, [instance(appender)])
    const expectedEvent: LogEvent = {
        dateTime: anything(),
        category: anything(),
        level: Levels.INFO,
        context: anything(),
        data: anything(),
    }

    logger.log(Levels.INFO, 'some', 'message', { and: 'object' })

    verify(appender.log(deepEqual(expectedEvent))).called()
})

test('send log event with log data to each appender', () => {
    const appender = mock<Appender>()
    const logger = new DefaultLogger('category1', Levels.TRACE, [instance(appender)])
    const expectedEvent: LogEvent = {
        dateTime: anything(),
        category: anything(),
        level: anything(),
        context: anything(),
        data: ['some', 'message', { and: 'object' }],
    }

    logger.log(Levels.INFO, 'some', 'message', { and: 'object' })

    verify(appender.log(deepEqual(expectedEvent))).called()
})

test('send log event with context data to each appender', () => {
    const appender = mock<Appender>()
    const logger = new DefaultLogger('category1', Levels.TRACE, [instance(appender)])
    const expectedEvent: LogEvent = {
        dateTime: anything(),
        category: anything(),
        level: anything(),
        context: { some: 'context' },
        data: anything(),
    }
    logger.addContext('some', 'context')

    logger.log(Levels.INFO, 'some', 'message', { and: 'object' })

    verify(appender.log(deepEqual(expectedEvent))).called()
})
