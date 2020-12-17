export const isType = (type, value) => {
  if (typeof value !== type) throw new Error(`Invalid value ${value} should be typeof ${type}`)
  return value
}

export const isTypeOrDefault = (type, value, defaultValue) => {
  if (value === null || typeof value === 'undefined') return defaultValue
  return isType(type, value)
}

export const typeString = (value) => isType('string', value)
export const typeStringOrDefault = (value, defaultValue) => isTypeOrDefault('string', value, defaultValue)

export const typeBool = (value) => isType('boolean', value)
export const typeBoolOrDefault = (value, defaultValue) => isTypeOrDefault('boolean', value, defaultValue)

export const typeNumber = (value) => isType('number', value)
export const typeNumberOrDefault = (value, defaultValue) => isTypeOrDefault('number', value, defaultValue)

export const typeFunc = (value) => isType('function', value)
export const typeFuncOrDefault = (value, defaultValue) => isTypeOrDefault('function', value, defaultValue)

export const typeObject = (value) => isType('object', value)
export const typeObjectOrDefault = (value, defaultValue) => isTypeOrDefault('object', value, defaultValue)

export default {
  isType,
  isTypeOrDefault,
  typeString,
  typeStringOrDefault,
  typeBool,
  typeBoolOrDefault,
  typeNumber,
  typeNumberOrDefault,
  typeFunc,
  typeFuncOrDefault,
  typeObject,
  typeObjectOrDefault
}