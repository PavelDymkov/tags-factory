import { createTag } from "../package/main";

test("factory test", () => {
    const tag = createTag((items) => {
        expect(items).toEqual(["a", 1, "b", { a: 1 }, "c"]);
    });

    tag`a${1}b${{ a: 1 }}c`;
});
