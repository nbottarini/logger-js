export enum Levels {
    TRACE = 'TRACE', // Designates finer-grained informational events than the DEBUG
    DEBUG = 'DEBUG', // Designates fine-grained informational events that are most useful to debug an application
    INFO = 'INFO', // Designates informational messages that highlight the progress of the application at coarse-grained level
    WARN = 'WARN', // Designates potentially harmful situations
    ERROR = 'ERROR', // Designates error events that might still allow the application to continue running
    FATAL = 'FATAL', // Designates very severe error events that will presumably lead the application to abort
}

function getLevelNumber(level: Levels): number {
    switch (level) {
        case Levels.TRACE: return 5
        case Levels.DEBUG: return 4
        case Levels.INFO: return 3
        case Levels.WARN: return 2
        case Levels.ERROR: return 1
        case Levels.FATAL: return 0
    }
}

export function canLogLevel(level: Levels, maxLevel: Levels|null) {
    if (maxLevel === null) return false
    return getLevelNumber(level) <= getLevelNumber((maxLevel))
}

export const defaultLevel = Levels.INFO
