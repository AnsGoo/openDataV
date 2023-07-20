import type { DataConfig } from '@/apiView/type'
import type { DataAcceptor } from '@/models/type'

interface DataInstance {
  toJSON: () => any | undefined
  connect: (dataAcceptor: DataAcceptor) => void
  close?: () => void
}

export class DataSlotter {
  public type: string
  public dataInstance: DataInstance | undefined

  private acceptor: DataAcceptor

  constructor({
    type,
    acceptor,
    dataInstance
  }: {
    type: string
    acceptor: DataAcceptor
    dataInstance?: DataInstance
  }) {
    this.type = type
    this.acceptor = acceptor
    this.dataInstance = dataInstance
    if (this.dataInstance && this.dataInstance.connect) {
      this.dataInstance.connect(this.acceptor)
    }
  }

  public changeDataConfig(config: DataConfig) {
    if (this.dataInstance?.close) {
      this.dataInstance.close()
    }
    if (config && config.dataInstance && config.dataInstance.connect) {
      config.dataInstance.connect(this.acceptor)
    }
    this.dataInstance = config.dataInstance
  }

  public setAcceptor(acceptor: DataAcceptor) {
    this.acceptor = acceptor
    if (this.dataInstance && this.dataInstance.connect) {
      this.dataInstance.connect(this.acceptor)
    }
  }
  get dataConfig() {
    return {
      type: this.type,
      dataInstance: this.dataInstance
    }
  }
}

export default { DataSlotter }
