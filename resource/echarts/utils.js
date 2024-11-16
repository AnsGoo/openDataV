export const compareResetValue = (value, upperLimit, lowLimit) => {
    if (value < lowLimit) {
        return lowLimit;
    }
    else if (value > upperLimit) {
        return upperLimit;
    }
    else {
        return value;
    }
};
//# sourceMappingURL=utils.js.map