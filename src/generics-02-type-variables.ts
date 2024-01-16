// TypeScript docs
// https://www.typescriptlang.org/docs/handbook/2/generics.html#working-with-generic-type-variables

/* When you begin to use generics, you’ll notice that when you create generic functions, the compiler will enforce that you use any generically typed parameters in the body of the function correctly. 

That is, that you actually treat these parameters as if they could be any and all types. */

/* The generic function loggingIdentityBad takes a type parameter Type, and an argument of type Type, and returns Type. */
function loggingIdentityBad<Type>(arg: Type): Type {
  console.log(arg.length);
  // Compiler error: Property 'length' does not exist on type 'Type'.
  return arg;
}

/* The generic function loggingIdentityGood takes a type parameter Type, and an argument arg which is an array of Types, and returns an array of Types. */
function loggingIdentityGood<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length);
  return arg;
}
/* This pattern allows us to use our generic type variable <Type> as part of the types we're working with (as params, args, return values), rather than the whole type. >>> GREATER FLEXIBILITY */
