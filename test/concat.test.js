const { describe, expect, test } = require('@jest/globals')
const MyArray = require('../MyArray')

const lettersArr = ['a', 'b', 'c', 'd', 'e', 'f'];
const numbersArr = [1, 2, 3, 4, 5, 6];
const monthsArr = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"]

const lettersMyArr = new MyArray(...lettersArr)
const numbersMyArr = new MyArray(...numbersArr)
const monthsMyArr = new MyArray(...monthsArr)

const letter = 'g';
const number = 7;

describe("Method >> concat()", () => {

    test("Probando sin argumentos", () => {
        expect([...lettersMyArr.concat()]).toEqual(lettersArr.concat())
    })
    
    test("Concatenating an element and testing output data type", () => {
        const myArr = lettersMyArr.concat(letter)
        const arr = lettersArr.concat(letter)
        expect(myArr).toBeInstanceOf(MyArray)
        expect([...myArr]).toEqual(arr)
        expect([...myArr.keys()]).toEqual([...arr.keys()])
        expect(lettersArr).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
    })

    test("Concatenating 2 arrays", () => {
        const myArr = lettersMyArr.concat(numbersMyArr)
        const arr = lettersArr.concat(numbersArr)
        expect([...myArr]).toEqual(arr)
        expect([...myArr.keys()]).toEqual([...arr.keys()])
    })

    test("Concatenating 3 arrays", () => {
        const myArr = lettersMyArr.concat(numbersMyArr, monthsMyArr)
        const arr = lettersArr.concat(numbersArr, monthsArr)
        expect([...myArr]).toEqual(arr)
        expect([...myArr.keys()]).toEqual([...arr.keys()])
    })



})