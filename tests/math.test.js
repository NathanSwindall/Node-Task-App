const {add, subtract} = require("./math")

test("math tests", () => {
    const addition = add(3,3)
    expect(addition).toEqual(6)
})

test("subtraction function", () => {
    expect(subtract(3,3)).toEqual(0)
})