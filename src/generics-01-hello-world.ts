// TypeScript docs:
// https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics

/* The “hello world” of generics: 
The identity function will return back whatever is passed in. */

// Without generics, we would either have to give the identity function a specific type...
function identity(arg: number): number {
  return arg;
}

// Or, we could describe the identity function using the any type:
function identityAny(arg: any): any {
  return arg;
}

/* While using any is certainly generic in that it will cause the function to accept any and all types for the type of arg, we actually are losing the information about what that type was when the function returns. If we passed in a number, the only information we have is that any type could be returned. */

/* Instead, we need a way of capturing the type of the argument in such a way that we can also use it to denote what is being returned... */

// Introducing: TYPE VARIABLES, a special kind of variable that works on types rather than values.
// Here, it captures the type the user provides (e.g. number), so that we can use that information later.
// Here, we use <Type> again as the return type.
function identityGeneric<Type>(arg: Type): Type {
  return arg;
}

/* Take note:
Now, our function is generic, as it works over a range of types. But unlike 'any', it's also as precise as the first function that strictly used numbers for the argument and return type. */

/* Once we've written the generic function, we can call it in one of two ways */

// 1. Pass all of the arguments, including the type argument, to the function:
// Hover over the output1 variable to see the return type: string
let output1 = identityGeneric<string>("myString");

// 2. Use type argument inference: We want the compiler to set the value of <Type> for us automatically based on the type of the argument we pass in:
// Hover over the output2 variable to see the return type: string
let output2 = identityGeneric("myString");

/* While type argument inference can be a helpful to keep code shorter / more readable, you may need to explicitly pass in the type arguments when the compiler fails to infer the type, as may happen in more complex examples. */
