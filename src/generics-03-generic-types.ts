// TypeScript docs:
// https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types

// in previous section (02-type-variables) we created generic identity functions that worked over a range of types.

// In this section, we'' explore the type of the functions themselves, and how to create generic interfaces.

function identity_1<Type>(arg: Type): Type {
  return arg;
}

// The type of generic functions is just like those of non-generic functions, with the type parameters listed first, similarly to function declarations:
let myIdentity_1: <Type>(arg: Type) => Type = identity_1;

// We could also have used a different name for the generic type parameter in the type, so long as the number of type variables and how the type variables are used line up.
let myIdentity_2: <Input>(arg: Input) => Input = identity_1;

// We can also write the generic type as a call signature of an object literal type:
let myIdentity_3: { <Type>(arg: Type): Type } = identity_1;

/* ##################################################################################################### */

/* Which leads us to writing our first generic interface. Let’s take the object literal from the previous example and move it to an interface: */
interface GenericIdentityFn_1 {
  <Type>(arg: Type): Type; // type parameter only visible to interface member "arg"
}

function identity_2<Type>(arg: Type): Type {
  return arg;
}

let myIdentity_4: GenericIdentityFn_1 = identity_2;
// myIdentity_4 is typed as type GenericIdentityFn_1, and initialized with value identity_2
// >>> WE ARE DESCRIBING A GENERIC FUNCTION

/* We may want to move the generic parameter to be a parameter of the whole interface.

This lets us see what type(s) we'er generic over (e.g. Dictionary<string> rather than just Dictionary). */

// This makes type parameter visible to all members of the interface.
interface GenericIdentityFn_2<Type> {
  (arg: Type): Type;
}
/* When we use GenericIdentityFn_2, we now will also need to specify the corresponding type argument, effectively locking in what the underlying call signature will use. */

let myIdentity_5: GenericIdentityFn_2<number> = identity_2;
// myIdentity_5 is typed as type GenericIdentityFn_2 with corresponding type argument <number>, and initialized with value identity_2
// >>> WE ARE DESCRIBING A NON-GENERIC FUNCTION SIGNATURE THAT IS PART OF A GENERIC TYPE.

/*  Understanding when to put the type parameter directly on the call signature and when to put it on the interface itself will be helpful in describing what aspects of a type are generic. */
