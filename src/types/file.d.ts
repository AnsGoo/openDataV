export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
