module.exports = {
  extends: ['stylelint-config-recommended-vue'],
  customSyntax: 'postcss-less',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'variants', 'responsive', 'screen']
      }
    ],
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      // 要求或禁止在规则声明之前有空行
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'at-rule-name-case': 'lower',
    'no-eol-whitespace': [
      true,
      {
        ignore: ['empty-lines']
      }
    ],
    'no-missing-end-of-source-newline': null, // 文件最后不需要一个空行
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values']
      }
    ],
    'declaration-block-no-shorthand-property-overrides': true,
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'function-calc-no-unspaced-operator': true,
    'no-descending-specificity': true,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true
  }
}
