import { Levels, LogEvent } from '@nbottarini/abstract-logger'
import { Formatter } from './Formatter'
import dateFormat from 'date-format'
import { dataToString } from './dataToString'
import chalk, { Chalk } from 'chalk'

export class ColoredFormatter implements Formatter {
    constructor(private timestampFormat: string = dateFormat.ISO8601_FORMAT) {}

    format(event: LogEvent): string {
        const stringData = event.data.map(it => dataToString(it)).join(' ')
        const timestamp = dateFormat.asString(this.timestampFormat, event.dateTime)
        const color = this.getLevelColor(event.level)
        const filledColor = this.getLevelFilledColor(event.level)
        return color(`[${timestamp}] `) + filledColor(' ' + event.level + ' ') + color(` ${event.category} - `) + stringData
    }

    private getLevelColor(level: Levels): Chalk {
        switch (level) {
            case Levels.TRACE: return chalk.cyanBright
            case Levels.DEBUG: return chalk.blueBright
            case Levels.INFO: return chalk.whiteBright
            case Levels.WARN: return chalk.yellowBright
            case Levels.ERROR: return chalk.redBright
            case Levels.FATAL: return chalk.magentaBright
        }
    }

    private getLevelFilledColor(level: Levels): Chalk {
        switch (level) {
            case Levels.TRACE: return chalk.bgCyanBright.black
            case Levels.DEBUG: return chalk.bgBlueBright.black
            case Levels.INFO: return chalk.bgWhiteBright.black
            case Levels.WARN: return chalk.bgYellowBright.black
            case Levels.ERROR: return chalk.bgRedBright.black
            case Levels.FATAL: return chalk.bgMagentaBright.black
        }
    }

    static fullDate() {
        return new ColoredFormatter(dateFormat.ISO8601_FORMAT)
    }

    static onlyTime() {
        return new ColoredFormatter('hh:mm:ss.SSS')
    }
}
