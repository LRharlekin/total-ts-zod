// TypeScript docs:
// https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints

/* You may sometimes want to write a generic function that works on a set of types where you have some knowledge about what capabilities that set of types will have. */
function loggingIdentityBad<Type>(arg: Type): Type {
  console.log(arg.length);
  // Compiler ERROR: Property 'length' does not exist on type 'Type'.
  return arg;
}

/* Instead of working with any and all types, we’d like to constrain this function to work with any and all types that also have the .length property. 

As long as the type has this member, we’ll allow it, but it’s required to have at least this member. */

/* To do so, we must list our requirement as a constraint on what <Type> can be: 
- We’ll create an interface that describes our constraint. 
- Then we’ll use this interface and the extends keyword to denote our constraint. */
interface Lengthwise {
  length: number;
}

function loggingIdentityGood<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

loggingIdentityGood(3);
// Because the generic function is now constrained, it will no longer work over any and all types.
// Compiler ERROR: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.

loggingIdentityGood({ value: 3, length: 10 });
// Instead, we need to pass in values whose type has all the required properties.

/* ################################################################################################### */

// Using Type Parameters in Generic Constraints
// TypeScript docs: https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints

/* You can declare a type parameter that is constrained by another type parameter. */

/* Example:
- We’d like to get a property from an object given its name. 
- We’d like to ensure that we’re not accidentally grabbing a property that does not exist on the object, so we’ll place a constraint between the two types: */

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  // Key is typed as union type of all keys on obj
  return obj[key];
}

let exampleObj = { a: 1, b: 2, c: 3, d: 4 };

getProperty(exampleObj, "a");
getProperty(exampleObj, "m");
// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
