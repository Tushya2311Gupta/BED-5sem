const sum=require('./sum');
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test("sum of '2' and 3 should return all argument must be number", () => {
    expect(() => {
        sum("2", 3);
    }).toThrow("all argument must be number");
});
test("sum of 2 and '3' should return all argument must be number", () => {
    expect(() => {
        sum(2, "3");
    }).toThrow("all argument must be number");
});
test("sum of '2' and '3' should return all argument must be number", () => {
    expect(() => {
        sum("2", "3");
    }).toThrow("all argument must be number");
});