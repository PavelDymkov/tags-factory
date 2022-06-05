import { createTagReturnsString } from "../package/main";

test("value in the middle", () => {
    const actual = createTagReturnsString()`a${1}b`;

    expect(actual).toEqual("a1b");
});

test("starts with value", () => {
    const actual = createTagReturnsString()`${1}a`;

    expect(actual).toEqual("1a");
});

test("ends with value", () => {
    const actual = createTagReturnsString()`a${1}`;

    expect(actual).toEqual("a1");
});

test("no value", () => {
    const actual = createTagReturnsString()`a`;

    expect(actual).toEqual("a");
});

test("only value", () => {
    const actual = createTagReturnsString()`${1}`;

    expect(actual).toEqual("1");
});
