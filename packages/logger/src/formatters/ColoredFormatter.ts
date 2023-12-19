import { Levels, LogEvent } from '@nbottarini/abstract-logger'
import { Formatter } from './Formatter'
import { ColorStyle, colorStyles, dataToString, formatTimestampLevelAndCategory } from './utils'

export class ColoredFormatter implements Formatter {
    format(event: LogEvent): string {
        const stringData = event.data.map(it => dataToString(it)).join(' ')
        return formatTimestampLevelAndCategory(event, this.getLevelColor(event.level)) + stringData + '\n'
    }

    private getLevelColor(level: Levels): ColorStyle {
        switch (level) {
            case Levels.TRACE: return colorStyles.blue
            case Levels.DEBUG: return colorStyles.cyan
            case Levels.INFO: return colorStyles.green
            case Levels.WARN: return colorStyles.yellow
            case Levels.ERROR: return colorStyles.red
            case Levels.FATAL: return colorStyles.magenta
        }
    }
}
