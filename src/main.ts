export interface Tag<Value, ReturnValue> {
    (strings: TemplateStringsArray, ...values: Value[]): ReturnValue;
}

export interface TagProcessor<Value, ReturnValue> {
    (items: Value[]): ReturnValue;
}

export interface TagParams<SourceValue, MappedValue, ReturnValue> {
    process: TagProcessor<MappedValue, ReturnValue>;
    mapper(value: SourceValue): MappedValue;
}

export function createTag<SourceValue, Value, ReturnValue>(
    params:
        | TagProcessor<SourceValue, ReturnValue>
        | TagParams<SourceValue, Value, ReturnValue>,
): Tag<SourceValue, ReturnValue> {
    const { process, mapper } =
        typeof params === "function" ? toParams(params) : params;

    return (strings, ...values) => {
        const array = Array(strings.length + values.length);

        for (let i = 0, lim = strings.length, last = lim - 1; i < lim; i++) {
            const offset = i * 2;

            array[offset] = strings[i];

            if (i !== last) array[offset + 1] = mapper(values[i]);
        }

        return process(array);
    };
}

function toParams<SourceValue, ReturnValue>(
    process: TagProcessor<SourceValue, ReturnValue>,
): TagParams<SourceValue, SourceValue, ReturnValue> {
    return {
        process,
        mapper(value) {
            return value;
        },
    };
}

export interface StringifyFn {
    (source: any): string;
}

export function createTagReturnsString(
    stringify?: StringifyFn | null,
): Tag<any, string> {
    const stringifier: StringifyFn = stringify || stringifyFn;

    return createTag((items) => {
        const copy = Array(items.length);

        for (let i = 0, lim = items.length; i < lim; i++)
            copy[i] = i & 1 ? stringifier(items[i]) : items[i];

        return copy.join("");
    });
}

function stringifyFn(source: any): string {
    if (typeof source === "string") return source;
    if (typeof source === "number") return source ? String(source) : "0";
    if (Array.isArray(source)) return source.map(stringifyFn).join("");

    return "";
}
