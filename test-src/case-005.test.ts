import { createTagReturnsString } from "../package/main";

test("mapper test", () => {
    const tag = createTagReturnsString((source) => {
        if (typeof source === "number") return source + 1;

        return source;
    });

    const actual = tag`a${0}b${1}`;

    expect(actual).toEqual("a1b2");
});
