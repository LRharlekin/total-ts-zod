// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});
/* 

// REFINE SYNTAX
// .refine(validator: (data:T) => any, params?: RefineParams)
// !!! Refinement functions should NOT THROW! Instead they should return a falsy value to signal failure.
// .refine() takes 2 arguments
// 1. Validator function: takes 1 input of type T (the inferred type of the schema). 
// 2. The second argument accepts options, to be used to customize certain error-handling behavior.


  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "Passwords don't match" }
  );
   */
//^ 🕵️‍♂️

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should error if the passwords are not the same", () => {
  expect(() =>
    validateFormInput({
      password: "password",
      confirmPassword: "password1",
    })
  ).toThrowError("Passwords don't match");
});
