import { LogLevel, StaticKey } from './enums'
import { eventBus } from './useEventBus'

export default class Logger {
  public name: string
  private print({ type, message }: { type: LogLevel; message: string }) {
    eventBus.emit(StaticKey.STDOUT, {
      type,
      message,
      name: this.name,
      time: new Date()
    })
  }

  constructor(name: string) {
    this.name = name
  }
  public info(message: string) {
    this.print({ type: LogLevel.INFO, message })
  }
  public debug(message: string) {
    this.print({ type: LogLevel.DEBUG, message })
  }
  public warn(message: string) {
    this.print({ type: LogLevel.WARN, message })
  }
  public error(message: string) {
    this.print({ type: LogLevel.ERROR, message })
  }
  public success(message: string) {
    this.print({ type: LogLevel.SUCCESS, message })
  }
}
