import dateFormat from 'date-format'

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
