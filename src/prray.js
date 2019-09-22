const { prraypromise, setPrray } = require('./prraypromise')
const methods = require('./methods')

class Prray extends Array {
  constructor(arr) {
    if (typeof arr === 'number') {
      super(arr)
    } else if (arr.length === 1) {
        super()
        this[0] = arr[0]
    } else {
      super(...arr)
    }
  }
  map(mapper) {
    const promise = methods.map(this, mapper)
    return prraypromise(promise)
  }
  filter(func) {
    const promise = methods.filter(this, func)
    return prraypromise(promise)
  }
  reduce(func, initialValue) {
    const promise = methods.reduce(this, func, initialValue)
    return prraypromise(promise)
  }
  reduceRight(func, initialValue) {
    const promise = methods.reduceRight(this, func, initialValue)
    return prraypromise(promise)
  }
  sort(func) {
    const promise = methods.sort(this, func)
    return prraypromise(promise)
  }
  find(func) {
    return methods.find(this, func)
  }
  findIndex(func) {
    return methods.findIndex(this, func)
  }
  every(func) {
    return methods.every(this, func)
  }
  some(func) {
    return methods.some(this, func)
  }
  forEach(func) {
    return methods.forEach(this, func)
  }
}

setPrray(Prray)

module.exports = Prray
