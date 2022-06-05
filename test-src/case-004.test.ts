import { createTag } from "../package/main";

test("mapper test", () => {
    const tag = createTag({
        process(items) {
            return items;
        },
        mapper(source) {
            if (typeof source === "number") return source + 1;

            return source;
        },
    });

    const actual = tag`a${0}b${1}`;

    expect(actual).toEqual(["a", 1, "b", 2, ""]);
});
