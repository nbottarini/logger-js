import { Logger } from './Logger'

export type LoggerFactoryFunc = (category: string) => Logger
