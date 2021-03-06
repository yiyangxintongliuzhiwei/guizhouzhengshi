module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  'extends': 'standard',
  // required to lint *.vue files
  'plugins': [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'semi': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 取消未定义变量报错
    'no-undef': 0,
    // 禁止使用new Function(); 语句
    'no-new-func': 2,
    'space-before-function-paren': ["error", "never"],
    'space-after-keywords': 0,
    "space-in-parens": 0,
    "eol-last": 0
  }
}
