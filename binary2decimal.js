const b2D = (bin) => {
  let decimal = 0
  for (let i = bin.length - 1; i >= 0; i--) {
    decimal += parseInt(bin[i]) * Math.pow(2, bin.length - 1 - i)
  }
  return decimal
}

console.log(b2D('1001'))
