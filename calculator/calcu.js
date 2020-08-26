const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.keys')
const display = document.querySelector('.display')

keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target

    const displayedNum = display.textContent
    //Pure function
    const resultString = createResultString(key, displayedNum, calculator.dataset)
    //Impure stuff
    display.textContent = resultString
    updateCalculatorState(key, calculator, resultString, displayedNum)
    updateVisualState(key, calculator)
  }
})

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
}

const getKeyType = (key) => {
  const action = key.dataset.action
  if (!action) return 'number'
  if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide')
    return 'operator'
  return action
}

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)

  Array.from(key.parentNode.children).forEach((k) => k.classList.remove('is-depressed'))

  //if (keyType === 'operator') key.classList.add('is-depressed')

  if (keyType === 'clear' && key.textContent !== 'AC') {
    key.textContent = 'AC'
  }

  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}

const createResultString = (key, displayedNum, state) => {
  const keyType = getKeyType(key)
  console.log('keyType', keyType)
  const keyContent = key.textContent

  const firstValue = state.firstValue
  const modValue = state.modValue
  const operator = state.operator
  const previousKeyType = state.previousKeyType

  if (keyType === 'number') {
    if (displayedNum === '0' || previousKeyType === 'operator') {
      return keyContent
    } else if (previousKeyType === 'calculate') {
      return '0'
    } else {
      return displayedNum + keyContent
    }
  }
  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0'
    return displayedNum
  }
  if (keyType === 'operator') {
    //Note: its sufficient to check for first value and operator because secondvalue always exists
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum
  }

  if (keyType === 'clear') {
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
    displayedNum = 0
    return displayedNum
  }
  if (keyType === 'calculate') {
    console.log('operator', operator)
    console.log('firstValue', firstValue)
    if (firstValue) {
      return previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
    } else {
      return displayedNum
    }
  }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key)
  const firstValue = calculator.dataset.firstValue
  let modValue = calculator.dataset.modValue
  const operator = calculator.dataset.operator
  const previousKeyType = calculator.dataset.previousKeyType

  calculator.dataset.previousKeyType = keyType

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstValue = displayedNum
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculatedValue
      : displayedNum
  }
  if (keyType === 'calculate') {
    calculator.dataset.modValue =
      firstValue && previousKeyType === 'calculate' ? modValue : displayedNum
  }
  if (keyType === 'clear') {
    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = ''
      calculator.dataset.modValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    }
  }
}
