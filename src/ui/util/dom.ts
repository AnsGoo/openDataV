/* 节点操作的一些方法 */
interface Offset {
  width: number
  height: number
  left: number
  top: number
}
const getOffset = (el: HTMLElement): Offset => {
  // 返回元素偏移位置
  /*if (!el) {
    return
  }*/
  const componentRect: DOMRect = el.getBoundingClientRect()
  const top =
    componentRect.top +
    (window.pageYOffset || document.documentElement.scrollTop) -
    (document.documentElement.clientTop || 0)
  const left =
    componentRect.left +
    (window.pageXOffset || document.documentElement.scrollLeft) -
    (document.documentElement.clientLeft || 0)
  const width = el.offsetWidth
  const height = el.offsetHeight
  return { left: left, top: top, width: width, height: height }
}
const getWindow = () => {
  // 返回窗口宽高
  const width = document.documentElement.clientWidth || document.body.clientWidth
  const height = document.documentElement.clientHeight || document.body.clientHeight
  return { width: width, height: height }
}

export { getOffset, getWindow }
