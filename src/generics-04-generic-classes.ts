// TypeScript docs:
// https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes

/* A generic class has a similar shape to a generic interface. Generic classes have a generic type parameter list in angle brackets (<>) following the name of the class. */

class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
let myGenericNumber = new GenericNumber<number>();

myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

/* Nothing is restricting the GenericNumber class to only use the number type. We could have instead used string or even more complex objects. */

/* Just as with interface, putting the type parameter on the class itself lets us make sure all of the properties of the class are working with the same type. */

/* A class has two sides to its type: The static side and the instance side. 

Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.
 */
