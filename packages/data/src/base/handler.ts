import type { DataAcceptor, DataInstance } from '@open-data-v/base'
import { uuid } from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'

export abstract class BaseDataHandler<T> implements DataInstance {
  public options: T = {} as T
  public acceptor: DataAcceptor | undefined
  public debugAcceptor: DataAcceptor | undefined
  public id: string

  constructor({ options, id }: { options?: T; id?: string }) {
    const keys = Object.keys(options || {})
    keys.forEach((key) => {
      this.options[key] = options?.[key]
    })
    this.id = id || uuid()
  }

  public get type(): string {
    throw new Error('Method not implemented.')
  }
  public close() {}

  public async connect(acceptor: DataAcceptor) {
    this.acceptor = acceptor
    this.reconnect()
  }
  public async reconnect() {
    throw new Error('Method not implemented.')
  }

  public async debug(acceptor: DataAcceptor) {
    this.debugAcceptor = acceptor
    this.reconnect()
  }
  public updateOption(options: T) {
    this.options = {
      ...this.options,
      ...options
    }
    this.reconnect()
  }

  public disposeDebug() {
    this.debugAcceptor = undefined
  }

  public toJSON() {
    return {
      options: cloneDeep(this.options),
      type: this.type,
      id: this.id
    }
  }
}
