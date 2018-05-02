function isFunction(val) {
  return typeof val === 'function'
}

function isString(val) {
  return typeof val === 'string'
}

function isArray(val) {
  return val.constructor === Array
}

function isBoolean(val) {
  return val === true || val === false
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export { isFunction, isString, isArray, isBoolean, isObject }
