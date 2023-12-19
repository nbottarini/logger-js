import { Logger } from './Logger'

type Constructor = { new (...args: any[]): any }
export type LoggerFactoryFunc = (category?: string|Constructor) => Logger
