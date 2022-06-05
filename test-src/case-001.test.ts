import { createTag } from "../package/main";

test("value in the middle", () => {
    const actual = justMap()`a${1}b`;

    expect(actual).toEqual(["a", 1, "b"]);
});

test("starts with value", () => {
    const actual = justMap()`${1}a`;

    expect(actual).toEqual(["", 1, "a"]);
});

test("ends with value", () => {
    const actual = justMap()`a${1}`;

    expect(actual).toEqual(["a", 1, ""]);
});

test("no value", () => {
    const actual = justMap()`a`;

    expect(actual).toEqual(["a"]);
});

test("only value", () => {
    const actual = justMap()`${1}`;

    expect(actual).toEqual(["", 1, ""]);
});

function justMap() {
    return createTag((items) => items);
}
