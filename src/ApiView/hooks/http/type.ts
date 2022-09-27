import { ScriptType } from '@/components/ScriptsEdtor/eunm'
import { AxiosResponse } from 'axios'

export interface AfterScript {
  type: ScriptType
  code: string
  pramas: Recordable
}

export declare type FinallyResponse<T> = AxiosResponse<T> & { afterData: any }
