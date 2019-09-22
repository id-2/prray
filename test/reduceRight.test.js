import test from 'ava'
const { prraypromise, PrrayPromise } = require('../src/prraypromise')
const Prray = require('../src/prray')
const { delay } = require('./test-utils')

const func1 = (pre, c) => pre + c
const funcAsync1 = (pre, c) => delay(100).then(() => pre + c)

const func2 = (pre, c) => {
  pre.push(c + 1)
  return pre
}
const funcAsync2 = async (pre, c) => {
  await delay(100)
  pre.push(c + 1)
  return pre
}

test('prray reduceRight 1', async (t) => {
  const p = new Prray([1,2,3])

  // FIXME: 无法确定 reduceRight 的结果是不是数组，应该让 PrrayPromise 处理和兼容非数组的情况？
  t.true(p.reduceRight(func1) instanceof PrrayPromise)
  t.true(p.reduceRight(funcAsync1) instanceof PrrayPromise)

  t.deepEqual(await p.reduceRight(func1), [1,2,3].reduceRight(func1))
  t.deepEqual(await p.reduceRight(funcAsync1), [1,2,3].reduceRight(func1))

  t.deepEqual(await p.reduceRight(func1, 10), [1,2,3].reduceRight(func1, 10))
  t.deepEqual(await p.reduceRight(funcAsync1, 10), [1,2,3].reduceRight(func1, 10))
})

test('prray reduceRight 2', async (t) => {
  const p = new Prray([1,2,3])

  t.true(p.reduceRight(func2, []) instanceof PrrayPromise)
  t.true(p.reduceRight(funcAsync2, []) instanceof PrrayPromise)

  t.deepEqual(await p.reduceRight(func2, []), new Prray([1,2,3].reduceRight(func2, [])))
  t.deepEqual(await p.reduceRight(func2, []), new Prray([1,2,3].reduceRight(func2, [])))
})

test('prraypromise reduceRight 1', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3]))

  // FIXME: 无法确定 reduceRight 的结果是不是数组，应该让 PrrayPromise 处理和兼容非数组的情况？
  t.true(pp.reduceRight(func1) instanceof PrrayPromise)
  t.true(pp.reduceRight(funcAsync1) instanceof PrrayPromise)

  t.deepEqual(await pp.reduceRight(func1), [1,2,3].reduceRight(func1))
  t.deepEqual(await pp.reduceRight(funcAsync1), [1,2,3].reduceRight(func1))

  t.deepEqual(await pp.reduceRight(func1, 10), [1,2,3].reduceRight(func1, 10))
  t.deepEqual(await pp.reduceRight(funcAsync1, 10), [1,2,3].reduceRight(func1, 10))
})

test('prraypromise reduceRight 2', async (t) => {
  const pp = prraypromise(Promise.resolve([1,2,3]))

  t.true(pp.reduceRight(func2, []) instanceof PrrayPromise)
  t.true(pp.reduceRight(funcAsync2, []) instanceof PrrayPromise)

  t.deepEqual(await pp.reduceRight(func2, []), new Prray([1,2,3].reduceRight(func2, [])))
  t.deepEqual(await pp.reduceRight(func2, []), new Prray([1,2,3].reduceRight(func2, [])))
})
