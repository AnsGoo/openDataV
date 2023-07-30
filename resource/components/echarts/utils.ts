export const compareResetValue = (value: number, upperLimit: number, lowLimit: number): number => {
  if (value < lowLimit) {
    return lowLimit
  } else if (value > upperLimit) {
    return upperLimit
  } else {
    return value
  }
}
