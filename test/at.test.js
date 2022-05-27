const { describe, expect, test } = require('@jest/globals')
const MyArray = require('../MyArray')

describe("Method >> at()", () => {

    const arr = [5, 12, 8, 130, 44];
    const myArr = new MyArray(...arr)

    test("Using positive number", () => {
        const index = 2;
        expect(myArr.at(index)).toBe(arr.at(index))
    })

    test("Using a positive number greater than the maximum index", () => {
        const index = arr.length;
        expect(myArr.at(index)).toBe(arr.at(index))
    })

    test("Using zero (0)", () => {
        const index = 0;
        expect(myArr.at(index)).toBe(arr.at(index))
    })

    test("Usando a negative number", () => {
        const index = -1;
        expect(myArr.at(index)).toBe(arr.at(index))
    })

    test(`Using a negative number whose absolute value is
        greater than the length of the array`, () => {
        const index = -(arr.length + 1);
        expect(myArr.at(index)).toBe(arr.at(index))
    })

    test("No arguments (undefined)", () => {
        expect(myArr.at()).toBe(arr.at())
    })

    test("Using diferents data types", () => {
        expect(myArr.at("string")).toBe(arr.at("string"))
        expect(myArr.at({})).toBe(arr.at({}))
        expect(myArr.at([])).toBe(arr.at([]))
        expect(myArr.at(true)).toBe(arr.at(true))
        expect(myArr.at(NaN)).toBe(arr.at(NaN))
        expect(myArr.at(null)).toBe(arr.at(null))
    })
    
})


