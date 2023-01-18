// 1) With promise chaining and recursion
function promiseReduce(asyncFunctions, reduce, initialValue) {
    return new Promise((resolve) => {
        const asyncFn = asyncFunctions.shift();

        if (typeof asyncFn !== 'undefined') {
            asyncFn()
                .then((resultAsyncFn) => reduce(initialValue, resultAsyncFn))
                .then((resultReduce) => promiseReduce(asyncFunctions, reduce, resultReduce))
                .then((result) => resolve(result));
        } else {
            resolve(initialValue);
        }
    });
}

// 2) With async/await and loop
async function promiseReduce(asyncFunctions, reduce, initialValue) {
    for (const asyncFn of asyncFunctions) {
        const resultAsyncFn = await asyncFn();
        initialValue = reduce(initialValue, resultAsyncFn);
    }

    return initialValue;
}

// 3) With async/await and recursion
async function promiseReduce(asyncFunctions, reduce, initialValue) {
    if (Array.isArray(asyncFunctions) && asyncFunctions.length > 0) {
        const asyncFn = asyncFunctions.shift();   
        const resultAsyncFn = await asyncFn();
        const resultReduce = reduce(initialValue, resultAsyncFn);
        
        return await promiseReduce(asyncFunctions, reduce, resultReduce);
    } else {
        return initialValue;
    }
}