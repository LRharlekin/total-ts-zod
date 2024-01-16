// CODE

import { it } from "vitest";
import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

/* 
Problem framing and steps:

1. The function accepts as second argument an abstract Zod schema, which is not avaiable to control the return value / output.

2. The schema variable is typed as an instance of z.ZodType / z.ZodSchema /z.Schema (these are aliases of eachother and can be used interchangeably). This approach loses type information, namely which subclass the input actually is.

3. The function returns a Promise<any>. However, the test awaits the Promise to resolve to a specific type with shape
type Result = { name: string }.

Solution to 1 + 2 + 3
>> Pass in a generic type variable that extends z.ZodSchema
>> Thereby the generic parameter refers to the schema as a whole
>> Use the generic parameter to type the function's "schema" argument.
>> Type the return value so as to extract the type from the schema that the API response is parsed with.

*/

const genericFetch = (url: string, schema: z.ZodSchema) => {
  //                 ^ 🕵️‍♂️
  return fetch(url)
    .then((res) => res.json())
    .then((result) => schema.parse(result));
};

// TESTS

it("Should fetch from the Star Wars API", async () => {
  const result = await genericFetch(
    "https://www.totaltypescript.com/swapi/people/1.json",
    z.object({
      name: z.string(),
    })
  );

  type cases = [
    // Result should equal { name: string }, not any
    Expect<Equal<typeof result, { name: string }>>
  ];
});
