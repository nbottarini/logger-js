import { Configuration, defaultLevel, Logger } from '@nbottarini/abstract-logger'
import { ConsoleAppender } from './appenders/ConsoleAppender'
import { DefaultLogger } from './DefaultLogger'
import { CategoryConfigurationCache } from './CategoryConfigurationCache'

type Constructor = { new (...args: any[]): any }

export class LoggerManager {
    private _configuration: Configuration|null = null
    private _categoryCache = new CategoryConfigurationCache()

    getLogger(category: string|Constructor = 'default'): Logger {
        this.initializeDefaultConfigurationIfNotConfigured()
        let normalizedCategory = typeof category === 'function' ? category.name : category?.toString()
        normalizedCategory = normalizedCategory ?? 'default'
        const level = this._categoryCache.getLevel(normalizedCategory)
        const appenders = this._categoryCache.getAppenders(normalizedCategory)
        return new DefaultLogger(normalizedCategory, level, appenders)
    }

    get configuration(): Configuration {
        this.initializeDefaultConfigurationIfNotConfigured()
        return this._configuration
    }

    private initializeDefaultConfigurationIfNotConfigured() {
        if (this.isConfigured()) return
        this.configure(this.getDefaultConfig())
    }

    configure(config: Configuration) {
        // TODO: Override from ENV?
        this._configuration = config
        this._categoryCache.load(config)
    }

    isConfigured(): boolean {
        return this._configuration !== null
    }

    private getDefaultConfig(): Configuration {
        // TODO: Read from ENV
        return defaultConfig
    }
}

const defaultConfig: Configuration = {
    appenders: {
        console: new ConsoleAppender()
    },
    categories: {
        default: { appenders: ['console'], level: defaultLevel }
    }
}
