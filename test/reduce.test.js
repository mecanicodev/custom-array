const { describe, test, expect } = require('@jest/globals')
const MyArray = require('../MyArray')


describe('Method >> reduce()', () =>{

  test('Total sum, initial value zero (0)', () => {
    const arr = [0, 1, 2, 3];
    const myArr = new MyArray(...arr);
    const reducer = (a, b) => a + b;
    expect(myArr.reduce(reducer, 0)).toBe(arr.reduce(reducer, 0))
  })

  test('Total sum of property value of a an object {key: value} , initial value 0', () => {
    const arr = [{x: 1}, {x: 2}, {x: 3}];
    const myArr = new MyArray(...arr);
    const reducer = (a, b) => a + b.x;
    expect(myArr.reduce(reducer, 0)).toBe(arr.reduce(reducer, 0))
  })

  test('Total sum, initial value !== 0', () => {
    const arr = [15, 16, 17, 18, 19];
    const myArr = new MyArray(...arr);
    const reducer = (a, b) => a + b;
    expect(myArr.reduce(reducer, 10)).toBe(arr.reduce(reducer, 10))
  })

  test('Flatten an array of arrays', () => {
    const a = [0, 1], b = [2, 3], c = [4, 5]
    const arr = [a, b, c]
    const myArr = new MyArray(new MyArray(...a), new MyArray(...b), new MyArray(...c));
    const reducer = (acc, cur) => acc.concat(cur);
    expect([...myArr.reduce(reducer, new MyArray())])
    .toEqual(arr.reduce(reducer, []))
  })

  test('Counting instances of values in an object', () => {
    const arr = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
    const myArr = new MyArray(...arr)
    const reducer = (allNames, name) => {
      
      if (name in allNames) {
        allNames[name]++
      } else {
        allNames[name] = 1
      }
      return allNames
    }
    expect(myArr.reduce(reducer, {})).toEqual(arr.reduce(reducer, {}))
  })

  test('Grouping objects by a property', () => {
    const arr = [
      { name: 'Alice', age: 21 },
      { name: 'Max', age: 20 },
      { name: 'Jane', age: 20 }
    ];
    const myArr = new MyArray(...arr);
    const groupBy = 'age'
    const reducer = (acc, obj) => {
      let key = obj[groupBy]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }
    expect(myArr.reduce(reducer, {})).toEqual(arr.reduce(reducer, {}))
  })

  test('Bonding arrays contained in an array of objects using the spread operator and initialValue', () => {
    const arr = [{
      name: 'Anna',
      books: ['Bible', 'Harry Potter'],
      age: 21
    }, {
      name: 'Bob',
      books: ['War and peace', 'Romeo and Juliet'],
      age: 26
    }, {
      name: 'Alice',
      books: ['The Lord of the Rings', 'The Shining'],
      age: 18
    }]
    const myArr = new MyArray(...arr);
    const reducer = (acc, cur) => [...acc, ...cur.books]
    const initialValue = ['Alphabet']
    expect(myArr.reduce(reducer, new MyArray(...initialValue)))
    .toEqual(arr.reduce(reducer, initialValue))
  })

})
