import { Levels, LogEvent } from '@nbottarini/abstract-logger'
import { BasicFormatter } from '../../src/formatters/BasicFormatter'

test('return timestamp level and category with empty message if data is empty', () => {
    const event: LogEvent = {
        dateTime: new Date(2023, 7, 10, 15, 13, 20, 123),
        level: Levels.INFO,
        category: 'category1',
        data: [],
        context: {},
    }

    const result = formatter.format(event)

    expect(result).toEqual('[2023-08-10T15:13:20.123] [INFO] category1 - ')
})

test('when multiple data concatenate each item', () => {
    const event: LogEvent = {
        dateTime: new Date(2023, 7, 10, 15, 13, 20, 123),
        level: Levels.INFO,
        category: 'category1',
        data: ['one', 'two', { hello: 'world' }, [1, 2]],
        context: {},
    }

    const result = formatter.format(event)

    expect(result).toEqual('[2023-08-10T15:13:20.123] [INFO] category1 - one two {"hello":"world"} [1,2]')
})

const formatter = BasicFormatter.fullDate()
