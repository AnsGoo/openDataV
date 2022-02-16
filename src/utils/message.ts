import { ElMessageBox, ElMessage, Callback } from 'element-plus'

// 消息
const Message = (message: string): any => {
  return ElMessage({
    showClose: true,
    message
  })
}

// 成功
const successMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: 'success'
  })
}

// 警告
const warnMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: 'warning'
  })
}

// 失败
const errorMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: 'error'
  })
}

// 确认弹框
const confirmMessage = (
  message: string,
  title: string,
  callback?: Callback,
  confirmText?: string,
  cancelText?: string
): any => {
  return ElMessageBox.confirm(message, title, {
    confirmButtonText: confirmText ? confirmText : '确认',
    cancelButtonText: cancelText ? cancelText : '取消',
    type: 'success',
    center: true,
    callback: callback,
    customClass: ''
  })
}

export { Message, successMessage, warnMessage, errorMessage, confirmMessage }
