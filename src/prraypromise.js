const methods = require('./methods/index')

module.exports = function (promise) {
  for (const name in methods) {
    promise[name] = methods[name]
  }
  return promise
}
