function addByTwo(x) {
  return 2 + x
}
//const addByTwo = addByX(2)
//addByTwo(1)
//addByTwo(2)
var called = 0
function once(func) {
  var result
  function singleTime(y) {
    if (!result && called < 2) {
      called++
      result = func(y)
      return result
    } else {
      return result
    }
  }
  return singleTime
}

// /*** Uncomment these to check your work! ***/
const onceFunc = once(addByTwo)
console.log(onceFunc(4)) // => should log 6
console.log(onceFunc(10)) // => should log 6
console.log(onceFunc(9001)) //
