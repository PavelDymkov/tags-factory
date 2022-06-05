# tags-factory

![test: passing](https://raw.githubusercontent.com/PavelDymkov/tags-factory/master/badges/test.svg)
![license: ISC](https://raw.githubusercontent.com/PavelDymkov/tags-factory/master/badges/license.svg)

## Usage

```ts
import { createTag } from "tags-factory";

const u = createTag((items: string[]) => items.join("").toUpperCase());

u`a${"b"}c` === "ABC";
```
