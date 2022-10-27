//Calculator Class
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //CLEAR OPERANDS
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  //APPEND NUMBER
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //GET DISPLAY NUMBER
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  //UPDATE DISPLAY
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = ``;
    }
  }

  //CHOOSE OPERATION
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  //DELETE
  deleteNumber() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  //COMPUTE
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //if (isNaN(prev) || isNan(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.previousOperand = '';
    this.operation = undefined;
  }
}

//Select buttons of all kinds
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-Clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

//CALCULATOR OBJECT
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//NUMBER BUTTONS
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//OPERATION BUTTONS
operationButtons.forEach((operation) => {
  operation.addEventListener('click', () => {
    calculator.chooseOperation(operation.innerText);
    calculator.updateDisplay();
  });
});

//ALL CLEAR BUTTON
allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

//EQUALS BUTTON
equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

//DELETE BUTTON
deleteButton.addEventListener('click', () => {
  calculator.deleteNumber();
  calculator.updateDisplay();
});
