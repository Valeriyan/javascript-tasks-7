'use strict';

exports.init = function () {
    addCheckContainsKeys();
    addCheckHasKeys();
    addCheckContainsValues();
    addCheckHasValues();
    addCheckHasValueType();
    addCheckHasLength();
    addCheckHasParamsCount();
    addCheckHasWordsCount();
};

function getQueryType(query) {
    var types = {
        String: 'string',
        Array: 'array',
        Number: 'number',
        Function: 'function'
    };

    return types[query.name];
}

function getKeyType(key) {
    var type = typeof key;

    if (type === 'object') {
        if (Object.getPrototypeOf(key) === Array.prototype) {
            type = 'array';
        }
    }
    return type;
}

function addCheckContainsKeys() {
    Object.defineProperty(Object.prototype, 'checkContainsKeys', {
        value: function (keys) {
            var context = this;

            if (typeof context !== 'object') {
                return undefined;
            }
            for (var contextKey in context) {
                if (!context.hasOwnProperty(contextKey)) {
                    continue;
                }
                if (keys.some(function (item) {
                    if (item === contextKey) {
                        return true;
                    }
                    return false;
                })) {
                    return true;
                }
            }
            return false;
        }
    });
}

function addCheckHasKeys() {
    Object.defineProperty(Object.prototype, 'checkHasKeys', {
        value: function (keys) {
            var context = this;

            if (typeof context !== 'object') {
                return undefined;
            }
            if (Object.keys(context).length !== keys.length) {
                return false;
            }
            return keys.every(function (item) {
                return context.hasOwnProperty(item);
            });
        }
    });
}

function addCheckContainsValues() {
    Object.defineProperty(Object.prototype, 'checkContainsValues', {
        value: function (values) {
           var context = this;

           if (typeof context !== 'object') {
               return undefined;
           }
           for (var contextKey in context) {
               if (!context.hasOwnProperty(contextKey)) {
                   continue;
               }
               if (values.some(function (item) {
                       if (item === context[contextKey]) {
                           return true;
                       }
                       return false;
                   })) {
                   return true;
               }
           }
           return false;
       }
    });
}

function addCheckHasValues() {
    Object.defineProperty(Object.prototype, 'checkHasValues', {
        value: function (values) {
            var context = this;

            if (typeof context !== 'object') {
                return undefined;
            }
            if (Object.keys(context).length !== values.length) {
                return false;
            }
            return values.every(function (item) {
                for (var contextKey in context) {
                    if (!context.hasOwnProperty(contextKey)) {
                        continue;
                    }
                    if (context[contextKey] === item) {
                        return true;
                    }
                }
                return false;
            });
        }
    });
}

function addCheckHasValueType() {
    Object.defineProperty(Object.prototype, 'checkHasValueType', {
        value: function (key, type) {
            var context = this;

            if (typeof context !== 'object') {
                return undefined;
            }
            return getKeyType(context[key]) === getQueryType(type);
        }
    });
}

function addCheckHasLength() {
    var func = function (length) {
        return this.length === length;
    };

    Object.defineProperty(String.prototype, 'checkHasLength', {
        value: function () {
            return func.apply(this, [length]);
        }
    });
    Object.defineProperty(Array.prototype, 'checkHasLength', {
        value: function (length) {
            return func.apply(this, [length]);
        }
    });
}

function addCheckHasParamsCount() {
    Object.defineProperty(Function.prototype, 'checkHasParamsCount', {
        value: function (count) {
           return this.length === count;
       }
    });
}

function addCheckHasWordsCount() {
    Object.defineProperty(String.prototype, 'checkHasWordsCount', {
        value: function (count) {
           var countOfWords = this.split(/\s/).filter(
               function (item) {
                   return item !== '';
               }
           ).length;
           return countOfWords === count;
       }
    });
}
