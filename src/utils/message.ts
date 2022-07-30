import { useMessage } from 'naive-ui'
const messageObj = useMessage()
// 消息
const Message = (message: string): any => {
  return messageObj.info(message, {
    closable: true,
    duration: 5000
  })
}

// 成功
const successMessage = (message: string): any => {
  return messageObj.success(message, {
    closable: true,
    duration: 5000
  })
}

// 警告
const warnMessage = (message: string): any => {
  return messageObj.warning(message, {
    closable: true,
    duration: 5000
  })
}

// 失败
const errorMessage = (message: string): any => {
  return messageObj.error(message, {
    closable: true,
    duration: 5000
  })
}

export { Message, successMessage, warnMessage, errorMessage }
