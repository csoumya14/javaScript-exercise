/*The function reduce takes an array and reduces 
the elements to a single value. 
For example it can sum all the numbers, multiply them, 
or any operation that you can put into a function*/

function reduce(array, callback, initialValue) {
  var accumulator = 0
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(array[i], initialValue)
    initialValue = accumulator
    //console.log(accumulator)
  }
  return accumulator
}

function add(a, b) {
  return a + b
}

var ans = reduce([1, 2, 3], add, 0)
console.log(ans)

/*
You are given the length and width of a 4-sided polygon. 
The polygon can either be a rectangle or a square.
If it is a square, return its area. If it is a rectangle, 
return its perimeter.
*/
