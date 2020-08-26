const binary2dec = () => {
  var binaryNumber = document.getElementById('binary').value

  if (binaryNumber === '') {
    alert('Please enter value')
    return
  }

  let decimal = 0
  for (let i = binaryNumber.length - 1; i >= 0; i--) {
    decimal += parseInt(binaryNumber[i]) * Math.pow(2, binaryNumber.length - 1 - i)
  }
  document.getElementById('displayValue').style.display = 'block'
  document.getElementById('dec').innerHTML = decimal
  document.getElementById('binary').value = ''
  setTimeout(() => {
    const elem = document.getElementById('dec')
    elem.parentNode.removeChild(elem)
  }, 5000)
}

//click to call function
document.getElementById('button').onclick = function () {
  binary2dec()
}
