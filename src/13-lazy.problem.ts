// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const MenuItem = z.object({
  //             ^ 🕵️‍♂️
  link: z.string(),
  label: z.string(),
  children: z.array(MenuItem).default([]),
});

// Problem framing and steps
// 1. MenuItem schema cannot access MenuItem recursively, before initialization
// 2. If we want to recursively define schema, we need to define a type first >> initialize an interface MenuItemType with optional property children?: MenuItemType[]
// 3. Infer type of schema MenuItem from type with z.ZodType
// 4. wrap schema definition inside z.lazy() to allow for recursivity defining children

// TESTS

it("Should succeed when it encounters a correct structure", async () => {
  const menuItem = {
    link: "/",
    label: "Home",
    children: [
      {
        link: "/somewhere",
        label: "Somewhere",
        children: [],
      },
    ],
  };
  expect(MenuItem.parse(menuItem)).toEqual(menuItem);
});

it("Should error when it encounters an incorrect structure", async () => {
  const menuItem = {
    children: [
      {
        link: "/somewhere",
        label: "Somewhere",
        children: [],
      },
    ],
  };
  expect(() => MenuItem.parse(menuItem)).toThrowError();
});
