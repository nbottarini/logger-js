import { LogEvent } from '@nbottarini/abstract-logger'
import { Formatter } from './Formatter'
import { dataToString, formatTimestampLevelAndCategory } from './utils'

export class BasicFormatter implements Formatter {
    format(event: LogEvent): string {
        const stringData = event.data.map(it => dataToString(it)).join(' ')
        return formatTimestampLevelAndCategory(event) + stringData + '\n'
    }
}
