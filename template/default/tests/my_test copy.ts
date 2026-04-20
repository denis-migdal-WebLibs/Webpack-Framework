import { assert } from "std/assert";

import foo from "@/index.js";

Deno.test("my_test", () => {
    assert( foo() === 42 );
});