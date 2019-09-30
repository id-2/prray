// TODO: talk about tests, under development
// TODO: original array ?-> normal array

Prray -- "Promisified" Array, aims to replace original Array in some cases for convenience.

- comes with async methods, such as `mapAsync`, `filterAsync`, `everyAsync` .etc
- supports method chaining with async callbacks
- compatible with original array
- well-tested (coverage 93.17%)

```javascript
import { prray } from 'prray'

(async () => {

  // Convert original array to "prray"
  const prr = prray(['www.google.com', 'npmjs.org'])

  // Now you can do something like this
  const responses = await prr.mapAsync(fetch)

  // Method chaining with async callbacks works well
  const htmls = await prr.mapAsync(fetch).mapAsync(r => r.text())

  // Method chaining with async callbacks and common callbacks
  await prr.map(commonFunc)
    .sortAsync(asyncFunc)
    .concat(['github.com', 'wikipedia.org'])
    .reverse()
    .splice(1, 2)
    .reduceAsync(asyncFunc2)

})()
```


## Install

npm

```
npm install prray --save
```

yarn

```
yarn add prray
```


## Compatibility with original Array

```javascript
import { prray, Prray } from 'prray'

const arr = [1,2,3]
const prr = prray(arr)

prr[0]  // 1
prr.length  // 4

[...prr]  // [1,2,3]

prr instanceof Array // true
Array.isArray(prr) // true

JSON.stringify(prr)  // "[1, 2, 3]"

const iterator = prr[Symbol.iterator]()
iterator.next().value  // 1
iterator.next().value  // 2
iterator.next().value  // 3
iterator.next().done  // true

// Type compatibility in typescript
function func(arr: number[]) {
  return arr
}
func(new Prray(1,2,3))  // Type Prray is compatible with type Array
```

Distinguish prray with array:

```javascript
Prray.isPrray(prr)  // true
Prray.isPrray([1,2,3])  // false

prr instanceof Prray // true
arr instanceof Prray // false
```

## Usage

#### prray(array)

The prray() method creates and returns a new Prray instance with every element in the array.

```javascript
import { prray } from 'prray'

const prr = prray([1,2,3])
```

#### new Prray()

Class `Prray`. You can think of it as `Array`.

```javascript
import { Prray } from 'prray'

new Prray()  // likes new Array()
new Prray(1)  // likes new Array(1)
new Prray('a', 'b')  // likes new Array('a', 'b')
```

#### Prray.prototype.mapAsync(func)

The `map` method returns promise of a new prray with the return values or the resolved values of return promises of calling a provided function on every element.

- `func(currentValue, index, prray)`

```javascript
const resps = await prr.mapAsync(fetch)

// Method chaining
const jsons = await prr.mapAsync(fetch).mapAsync(res => res.json())

// Method chaining with other methods
const jsons = await prr.mapAsync(func1).filter(func2).everyAsync(fun3)
```

#### Prray.prototype.map(func)

_Compatible with [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)_

The map() method creates a new prray with the results of calling a provided function on every element in the calling prray.

#### Prray.prototype.filterAsync(func)

The `filterAsync` method returns promise of a new array with all elements that pass the test implemented by the provided function. You can think of it as **an async version of `Array.prototype.filter`**.

```javascript
// With async function
const existedFiles = await prr.filterAsync(isFileExisted)

// With common function
const evenNums = await prr.filterAsync(v => v % 2 === 0)

// Method chaining
await prr.filterAsync(isFileExisted).map(removeFile)
```

#### Prray.prototype.filter(func)

_Compatible with [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)_

The filter() method creates a new prray with all elements that pass the test implemented by the provided function.

#### Prray.prototype.slice(start, end)

_Compatible with [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)_

The slice() method returns a shallow copy of a portion of a prray into a new prray object selected from begin to end (end not included) where begin and end represent the index of items in that prray. The original prray will not be modified.

#### Prray.prototype.find(func)

_Compatible with [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)_

The find() method returns the value of the first element in the provided prray that satisfies the provided testing function.

#### Prray.prototype.findIndex(func)

_Compatible with [Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)_

The findIndex() method returns the index of the first element in the prray that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.

#### Prray.prototype.every(func)

_Compatible with [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)_

The every() method tests whether all elements in the prray pass the test implemented by the provided function. It returns a Boolean value. 

#### Prray.prototype.some(func)

_Compatible with [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)_

The some() method tests whether at least one element in the prray passes the test implemented by the provided function. It returns a Boolean value. 

#### Prray.prototype.includes(value)

_Compatible with [Array.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)_

The includes() method determines whether a prray includes a certain value among its entries, returning true or false as appropriate.

#### Prray.prototype.indexOf(value)

_Compatible with [Array.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)_

The indexOf() method returns the first index at which a given element can be found in the prray, or -1 if it is not present.

#### Prray.prototype.lastIndexOf(value)

_Compatible with [Array.prototype.lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)_

The lastIndexOf() method returns the last index at which a given element can be found in the prray, or -1 if it is not present. The prray is searched backwards, starting at fromIndex.

#### Prray.prototype.join(separator)

_Compatible with [Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)_

The join() method creates and returns a new string by concatenating all of the elements in a prray (or an array-like object), separated by commas or a specified separator string. If the prray has only one item, then that item will be returned without using the separator.

#### Prray.prototype.keys()

_Compatible with [Array.prototype.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)_

The keys() method returns a new Array Iterator object that contains the keys for each index in the prray.

#### Prray.prototype.values()

_Compatible with [Array.prototype.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)_

The values() method returns a new Array Iterator object that contains the values for each index in the prray.

#### Prray.prototype.entries()

_Compatible with [Array.prototype.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)_

The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the prray.

#### Prray.prototype.fill(value, start, end)

_Compatible with [Array.prototype.fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)_

The fill() method fills (modifies) all the elements of a prray from a start index (default zero) to an end index (default array length) with a static value. It returns the modified prray.

#### Prray.prototype.sort(func)

_Compatible with [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)_

The sort() method sorts the elements of a prray in place and returns the sorted prray. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

#### Prray.prototype.concat(arr)

_Compatible with [Array.prototype.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)_

The concat() method is used to merge two or more prrays and arrays. This method does not change the existing prrays, but instead returns a new prray.

#### Prray.prototype.copyWithin(target, star, end)

_Compatible with [Array.prototype.copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)_

The copyWithin() method shallow copies part of a prray to another location in the same prray and returns it without modifying its length.

#### Prray.prototype.toString()

_Compatible with [Array.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)_

The toString() method returns a string representing the specified prray and its elements.

#### Prray.prototype.toLocaleString()

_Compatible with [Array.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)_

The toLocaleString() method returns a string representing the elements of the prray. The elements are converted to Strings using their toLocaleString methods and these Strings are separated by a locale-specific String (such as a comma “,”).

#### Prray.prototype.forEachAsync(func)

_Think of it as async version of method `forEach`_

The forEachAsync() method executes a provided function once for each prray element asynchronously and returns a promise resolved after all iterations resolved.

```javascript
const emails = prray([/* emails */])
await emails.forEachAsync(sendAsync)
```

#### Prray.prototype.forEach(func)

_Compatible with [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)_

The forEach() method executes a provided function once for each prray element.

#### Prray.prototype.pop()

_Compatible with [Array.prototype.pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)_

The pop() method removes the last element from a prray and returns that element. This method changes the length of the prray.

#### Prray.prototype.push(...elements)

_Compatible with [Array.prototype.push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)_

The push() method adds one or more elements to the end of a prray and returns the new length of the prray.

#### Prray.prototype.reverse()

_Compatible with [Array.prototype.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)_

The reverse() method reverses a prray in place. The first prray element becomes the last, and the last prray element becomes the first.

#### Prray.prototype.reduce(func, initialValue)

_Compatible with [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)_

The reduce() method executes a reducer function (that you provide) on each element of the prray, resulting in a single output value.

#### Prray.prototype.reduceRight(func, initialValue)

_Compatible with [Array.prototype.reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)_

The reduceRight() method applies a function against an accumulator and each value of the prray (from right-to-left) to reduce it to a single value.

#### Prray.prototype.shift()

_Compatible with [Array.prototype.shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)_

The shift() method removes the first element from a prray and returns that removed element. This method changes the length of the prray.

#### Prray.prototype.unshift(...elements)

_Compatible with [Array.prototype.unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)_

The unshift() method adds one or more elements to the beginning of a prray and returns the new length of the prray.

#### Prray.prototype.splice(start, deleteCount, ...items)

_Compatible with [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)_

The splice() method changes the contents of a prray by removing or replacing existing elements and/or adding new elements in place.

#### Prray.prototype.toArray()

The toArray() method creates and returns a new normal array with every element in the prray.

```javascript
const prr = new Prray(1,2,3)

prr.toArray()  // [1,2,3]
```

#### Prray.from(arrayLike)

_Compatible with [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) but returns a prray._

The Prray.from() method creates a new, shallow-copied Prray instance from an array-like or iterable object.

```javascript
import { Prray } from 'prray'

Prray.from([1,2,3,4])
```

#### Prray.of(...args)

_Compatible with [`Array.of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) but returns a prray._

The Prray.of() method creates a new Prray instance from a variable number of arguments, regardless of number or type of the arguments.

```javascript
import { Prray } from 'prray'

Prray.of(1,2,3,4)
```

#### Prray.isPrray(obj)

The Prray.isArray() method determines whether the passed value is a Prray.

```javascript
import { Prray } from 'prray'

Prray.isPrray([1,2,3]) // false
Prray.isPrray(new Prray(1,2,3)) // true
```

## Different from [Bluebird](https://github.com/petkaantonov/bluebird)

**First**, prray does not provide another implementation of promise, which is essentially different from Bluebird.

**Secondly**, prray aims to provide a better way to handle asynchronous batch operations on data(array). In this aspect, maybe you work well with Bluebird's methods such as `all` and `map`, but prray gives you another option more appropriate in some cases.

```javascript
const urls = [ /* some urls */ ]

// use prray
await p(urls).mapAsync(fetch)
  .filterAsync(isExisted)
  .mapAsync(saveAsync)

// use bluebird
await Bluebird.mapAsync(await Bluebird.filter(await Bluebird.map(urls, fetch), isExisted), saveAsync)

// use bluebird and prettier
let responses = await Bluebird.map(urls, fetch)
responses = await Bluebird.filter(responses, isExisted)
await Bluebird.map(responses, saveAsync)
```

If you want a good promise implementation, this is bluebird.

If you want to handle asynchronous batch operations on data(array), prray is an option for you.
