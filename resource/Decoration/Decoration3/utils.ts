export function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(String(Math.random() * minNum + 1), 10)
  } else {
    return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10)
  }
}
