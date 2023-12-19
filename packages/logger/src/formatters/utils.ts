import { LogEvent } from '@nbottarini/abstract-logger'
import dateFormat from 'date-format'

export type ColorStyle = number[]

export const colorStyles = {
    // styles
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    // grayscale
    white: [37, 39],
    grey: [90, 39],
    black: [90, 39],
    // colors
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [91, 39],
    yellow: [33, 39],
}

function colorizeStart(color?: ColorStyle) {
    return color ? `\x1B[${color[0]}m` : ''
}

function colorizeEnd(color?: ColorStyle) {
    return color ? `\x1B[${color[1]}m` : ''
}

function colorize(text: string, color?: ColorStyle) {
    return colorizeStart(color) + text + colorizeEnd(color)
}

export function formatTimestampLevelAndCategory(event: LogEvent, color?: ColorStyle) {
    const timestamp = dateFormat.asString(event.dateTime)
    return colorize(`[${timestamp}] [${event.level}] ${event.category} - `, color)
}

export function dataToString(data: any): string {
    const type = typeof(data)
    switch (type) {
        case 'number':
        case 'boolean':
            return data.toString()
        case 'string': return data
        default:
            if (data instanceof Date) return dateFormat.asString(data)
            try {
                return JSON.stringify(data)
            } catch (_) {
                return '[Circular]'
            }
    }
}
