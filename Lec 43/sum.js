function sum(a,b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        // throw an Error so callers / tests can handle it via try/catch or expect(...).toThrow()
        throw new Error("all argument must be number");
    }
    return a + b;
}

module.exports = sum;