// 验证通过时返回true，否则返回错误提示
const regular: { [index: string]: any } = {
  digits: /^[0-9]*[1-9][0-9]*$/, // 正整数
  number: /^\d+(\.\d+)?$/, // 带小数
  mobile: /^1[3|4|5|7|8]\d{9}$/, // 手机
  mail: /^[a-z0-9A-Z._%-]+@([a-z0-9A-Z-]+\.)+[a-zA-Z]{2,4}$/,
  tel: /^0\d{2,3}-\d{7,8}$/, // 电话020-00000
  fax: /^(\d{3,4})?[-]?\d{7,8}$/
}

function newEval(fn: any) {
  const Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)()
}

const isEmpty = function (value: string) {
  return /^\s*$/g.test(value)
}
const isRules = function (value: any, rule: any, type?: any) {
  if (type === 'rule') {
    // return eval(rule).test(value)
    return newEval(rule).test(value)
  } else {
    if (regular[rule] === undefined) {
      return 'undefined'
    }
    return newEval(regular[rule]).test(value)
  }
}
const Validate = function (value: any, rules: any) {
  for (let i = 0, len = rules.length; i < len; i++) {
    const rule = rules[i]
    switch (rule.type) {
      case 'required':
        // false也当作空处理
        if (isEmpty(value) || value === false) {
          return rule.msg
        }
        break
      case 'digits':
      case 'number':
      case 'mobile':
      case 'mail':
      case 'tel':
      case 'fax':
        if (!isEmpty(value) && !isRules(value, rule.type)) {
          return rule.msg
        }
        break
      case 'phone':
        if (!isEmpty(value) && !(isRules(value, 'mobile') || isRules(value, 'tel'))) {
          return rule.msg
        }
        break
      case 'maxLength':
        if (!isEmpty(value) && parseInt(value.length) > parseInt(rule.len)) {
          return rule.msg
        }
        break
      case 'minLength':
        if (!isEmpty(value) && parseInt(value.length) < parseInt(rule.len)) {
          return rule.msg
        }
        break
      case 'rule':
        if (!isEmpty(value) && !isRules(value, rule.rule, 'rule')) {
          return rule.msg
        }
        break
      case 'fn':
        if (!rule.validator(value)) {
          return rule.msg
        }
        break
      default:
        break
    }
  }
  return true
}
export default Validate
