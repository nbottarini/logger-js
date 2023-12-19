import { Appender, LogEvent } from '@nbottarini/abstract-logger'

export class FakeAppender implements Appender {
    called: boolean = false

    log(event: LogEvent): void {
        this.called = true
    }
}
