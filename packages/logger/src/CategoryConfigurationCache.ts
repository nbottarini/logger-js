import { Appender, Configuration, defaultLevel, Levels } from '@nbottarini/abstract-logger'

export class CategoryConfigurationCache {
    private categories: Record<string, InternalCategoryConfiguration> = {}

    load(config: Configuration) {
        this.categories = {}
        this.initializeCategoriesFrom(config)
        this.addInheritance()
    }

    private initializeCategoriesFrom(config: Configuration) {
        const categoryNames = Object.keys(config.categories)
        categoryNames.forEach(category => {
            const categoryConfig = config.categories[category]
            this.categories[category] = {
                appenders: categoryConfig.appenders?.map(it => config.appenders[it]) ?? [],
                level: categoryConfig.level,
            }
        })
    }

    private addInheritance() {
        const categoryNames = Object.keys(this.categories)
        categoryNames.forEach(category => {
            this.inheritFromParent(category)
        })
    }

    private inheritFromParent(category: string) {
        const parentCategory = this.getParentCategoryName(category)
        if (!parentCategory) {
            this.createConfigIfNotExists(category)
            this.categories[category].level = this.categories[category].level ?? defaultLevel
            return
        }
        this.inheritFromParent(parentCategory)
        this.mergeWithParent(category, parentCategory)
    }

    private createConfigIfNotExists(category: string) {
        if (this.categories[category]) return
        this.categories[category] = { appenders: [], level: defaultLevel }
    }

    private mergeWithParent(category: string, parentCategory: string) {
        const categoryConfig = this.categories[category]
        const parentCategoryConfig = this.categories[parentCategory]
        categoryConfig.level = typeof (categoryConfig.level) === 'undefined' ? parentCategoryConfig.level : categoryConfig.level
        categoryConfig.appenders = categoryConfig.appenders ?? []
        parentCategoryConfig.appenders.forEach(appender => {
            if (!categoryConfig.appenders.includes(appender)) {
                categoryConfig.appenders.push(appender)
            }
        })
    }

    private getCategoryConfig(category: string): InternalCategoryConfiguration {
        const categoryConfig = this.categories[category]
        if (categoryConfig) return categoryConfig
        this.categories[category] = this.getParentCategoryConfig(category) ?? this.getDefaultCategory()
        return this.categories[category]
    }

    private getParentCategoryConfig(category: string): InternalCategoryConfiguration|null {
        const parentCategory = this.getParentCategoryName(category)
        if (!parentCategory) return null
        return this.getCategoryConfig(parentCategory)
    }

    private getParentCategoryName(category: string): string|null {
        const lastDotIndex = category.lastIndexOf('.')
        if (lastDotIndex <= 0) return null
        return category.slice(0, lastDotIndex)
    }

    private getDefaultCategory() {
        return this.categories['default'] ?? { appenders: [], level: null }
    }

    getLevel(category: string): Levels|null {
        return this.getCategoryConfig(category)?.level ?? null
    }

    getAppenders(category: string): Appender[] {
        return this.getCategoryConfig(category)?.appenders
    }
}

interface InternalCategoryConfiguration {
    appenders: Appender[],
    level?: Levels|null,
}
