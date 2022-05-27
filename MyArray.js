
class MyArray {
    constructor() {
        [this.length, this.data] = this.#init(arguments);
    }

    // PRIVATE METHODS

    #init(args) {
        const data = {};
        const length = args.length;
        for (let i = 0; i < length; i++) {
            data[i] = args[i]
        }
        return [length, data] ;
    }
    #absIndex(index) {
        return index >= 0 ? index : this.length + index
    }
    /** Returns a positive index such that 0 < index < this.length - 1 */
    #forceIndexToBoundaries(index) {
        return index >= 0 ? Math.min(this.length - 1, index) : Math.max(0, index += this.length)
    }

    /**
     * Reassigns the values ​​starting at index and replaces them with the value n positions forward (n = positions).
     * If ShiftAndDelete = true, delete the last duplicate elements
     */
    #shiftLeft(index, options = {}) {
        const {
            positions = 1,
            shiftAndDelete = false
        } = options;

        if (positions < 1 || index + positions >= this.length) return;

        this.forEach((currentValue, i) => {
            this.data[i] = this.data[i + positions];
        }, { fromIndex: index, toIndex: this.length - 1 - positions })

        if (shiftAndDelete) {
            this.forEach((currentValue, i) => {
                delete this.data[i]; 
                this.length--;
            }, { reverse: true, toIndex: this.length - positions })
        }
    }

    #shiftRight(index, options = {}) {
        const { positions = 1 } = options;

        if (positions < 1 || positions - index > this.length) return;

        this.length += positions;
        this.forEach((currentValue, i) => {
            this.data[i] = this.data[i - positions];
        }, { reverse: true, toIndex: index + positions })
    }
    
    

    // STATIC METHODS

    static isMyArray(myArrayObj) {
        return myArrayObj instanceof MyArray
    }

    static from(data) {
        if (Symbol.iterator in Object(data)) {
            return new MyArray(...data);
        } else {
            return new MyArray();
        }
    }

    // INSTANCE METHODS

    /**
     * 
     * @param {Function} callback A function that accepts up to three arguments. forEach calls the callback function one time for each element in the array.
     * @options
     * @param {boolean} options.reverse Indicates whether the array should be traversed from the end to the beginning
     * @param {number} options.fromIndex The index where traversing the array begins
     * @param {number} options.toIndex The index where traversing the array stops
     * @param {number} options.escapeIfTrue Indicates whether to stop traversing the array if callback returns true
     * @returns {void} 
     */
    forEach(callback, options = {}) {

        let currentValue;

        // forEach 
        if (Object.keys(options).length === 0) {
            for (let i = 0; i < this.length; i++) {
                currentValue = this.data[i]
                callback(currentValue, i, this)
            }
            return;
        }

        // forEach Pro
        const { 
            reverse = false,
            fromIndex = reverse ? this.length - 1 : 0,
            toIndex = reverse ? 0 : this.length - 1,
            escapeIfTrue = false
        } = options

        const limitIndex = (index, limit, callback) => {
            const positiveIndex = index >= 0 ? Math.min(index, this.length - 1) : Math.max(0, this.length + index);

            if (typeof callback === 'function') {
                return callback(positiveIndex, limit)
            }
            return positiveIndex
        }

        const from = limitIndex(fromIndex);
        const to = limitIndex(toIndex, from, (positiveIndex, limit) => {
            return reverse ? Math.min(positiveIndex, limit) : Math.max(positiveIndex, limit)
        })


        if (reverse) {
            for (let i = from; i >= to; i--) {
                currentValue = this.data[i]
                if (callback(currentValue, i, this) && escapeIfTrue) return true;
            }
        } else {
            for (let i = from; i <= to; i++) {
                currentValue = this.data[i]
                if (callback(currentValue, i, this) && escapeIfTrue) return true;
            }
        }

        return escapeIfTrue ? false : undefined;
    }

    at(index = 0) {
        // This is to emulate behavior of javascript's native array method
        if (typeof index === 'boolean') index = index ? 1 : 0;
        if (typeof index !== 'number' || isNaN(index)) index = 0;

        if (index >= 0 && index <= this.length - 1) {
            return this.get(index)
        }
        if (index < 0 && Math.abs(index) <= this.length) {
            return this.get(this.length + index)
        }
        return undefined;
    }

    concat() {
        const newMyArr = new MyArray(...this); // This is possible because the *[Symbol.iterator]() method is defined.
        for (let i = 0; i < arguments.length; i++) {
             // TODO Check this
            
            if (arguments[i] instanceof MyArray) {
                arguments[i].forEach(currentValue => {
                    newMyArr.push(currentValue);
                 })
            } else {
                newMyArr.push(arguments[i])
            }
            
        }
        return newMyArr;
    }

    copyWithin(target, start = 0, end = this.length) {
        target = this.#absIndex(target);
        start = this.#absIndex(start);

        if (end >= this.length) end = this.length;
        end = this.#absIndex(end);

        if (start >= end) return this;
        if (target < 0 || target >= this.length - 1) return this;

        for (let i = 0; i < end - start; i++) {
            this.data[target + i] = this.data[start + i]
        }
        return this;
    }
    

    filter(callback, options = {}) {
        const newMyArr = new MyArray();
        this.forEach((currentValue, index, myArrayObj) => {
            if (callback(currentValue, index, myArrayObj)) {
                newMyArr.push(currentValue)
            }
        }, options)
        return newMyArr;
    }

    find(callback, options = {}) {
        options["escapeIfTrue"] = true;
        let element;
        this.forEach((currentValue, index, myArrayObj) => {
            element = currentValue;
            return callback(currentValue, index, myArrayObj)
        }, options)
        return element;
    }

    findIndex(callback, options = {}) {
        options["escapeIfTrue"] = true
        let itemIndex;
        this.forEach((currentValue, index, myArrayObj) => {
            if (callback(currentValue, index, myArrayObj)) {
                itemIndex = index;
                return true;
            }
        }, options)
        return itemIndex || - 1;
    }

    flat(depth = 1) {
        const newMyArr = new MyArray();

        const deepFlat = (item, depth) => {
            if (MyArray.isMyArray(item) && depth > 0) {
                item.forEach(subItem => deepFlat(subItem, depth - 1))
                return;
            }
            newMyArr.push(item) // side effect
            return item;
        }

        this.forEach(currentValue => deepFlat(currentValue, depth))
        return newMyArr
    }

    includes(item, options = {}) {
        options["escapeIfTrue"] = true 
        return this.forEach(currentValue => currentValue === item, options);
    }

    every(callback) {
        if (this.length === 0) return true; //
        return !this.forEach((currentValue, index, myArrayObj) => {
                    return !callback(currentValue, index, myArrayObj);
                }, { escapeIfTrue: true })
    }

    join(separator = ',') {
        let string = '';
        this.forEach(currentValue => string += (string && separator) + currentValue)
        return string;
    }

    toString() {
        return this.join()
    }

    indexOf(searchElement, fromIndex = 0) {
        let itemIndex;
        this.forEach((currentValue, index) => {
            if (currentValue === searchElement) {
                itemIndex = index;
                return true;
            }
        }, { escapeIfTrue: true, fromIndex })

        return itemIndex || -1;
    }

    *keys() {
        let index = 0;
        while( index < this.length) {
            yield index++
        }
    }

    *values() {
        let index = 0;
        while (index < this.length) {
            yield this.get(index++)
        }
    }

    *entries() {
        let index = 0;
        while (index < this.length) {
            yield [index, this.get(index++)]
        }
    }
    
    // Allows the following to be applied to instances of MyArray:
    // 1. for...of
    // 2. Spread operator (spread operator)
    // 3. Destructuring assignment
    // 4. The yield* expression
    *[Symbol.iterator]() {
        yield* this.values();
    }

    get(index) {
        return this.data[index];
    }

    push(item) {
        this.data[this.length] = item;
        this.length++;
        return this.data;
    }

    pop() {
        const item = this.data[this.length - 1] 
        delete this.data[this.length - 1]
        this.length--;
        return item;
    }

    shift() {
        return this.delete(0);
    }

    unshift() {
        this.#shiftRight(0, { positions: arguments.length })
        for (let i = 0; i < arguments.length; i++) {
            this.data[i] = arguments[i]
        }
        return this.length;
    }

    delete(index) {
        const item = this.data[index];
        this.#shiftLeft(index, { shiftAndDelete: true })
        return item;
    }
    
    splice(start, deleteCount, ...newItems) {

        const newMyarr = new MyArray();

        if (start === undefined) return newMyarr;
        
        newItems ??= [];
        
        if (deleteCount < 0)  deleteCount = 0
        
        // This behavior is to emulate the splice method of a standard array.
        if (start > this.length - 1 && deleteCount === 0 && newItems.length > 0 ) {
            for (let i = 0; i < newItems.length; i++) {
                this.push(newItems[i])
            }
            return newMyarr;
        }
        

        start = this.#forceIndexToBoundaries(start);
        if (deleteCount === undefined || deleteCount > this.length - start) {
            deleteCount = this.length - start
        }
        
        
        // Save items to be deleted/overwritten
        for (let i = 0; i < deleteCount; i++) {
            newMyarr.push(this.data[start + i])
        }
        
        // shift array to the right from start, only if newItems.length - deleteCount > 0
        this.#shiftRight(start, { positions: newItems.length - deleteCount });

        // newItems values ​​are assigned
        for (let i = start; i < newItems.length; i++) {
            this.data[start + i] = newItems[i];
        }

        return newMyarr;
    }
    
    reduce(callback, initialValue) {
        // Edge cases
        if (this.length === 1 && initialValue === undefined) return this.get(0);
        if (this.length === 0 && initialValue !== undefined) return initialValue;
        
        let acc = initialValue ?? this.get(0);
        let fromIndex = initialValue === undefined ? 1 : 0;
    
        this.forEach((currentValue, currentIndex) => {
            acc = callback(acc, currentValue, currentIndex, this)
        }, {fromIndex})

        return acc
    }

} 


module.exports = MyArray;
