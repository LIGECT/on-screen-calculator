function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  if (operator === "/" && b === 0) return "Nice try, genius";

  switch (operator) {
    case "+":
      return add(a, b);

    case "-":
      return subtract(a, b);

    case "*":
      return multiply(a, b);

    case "/":
      return divide(a, b);
  }
  return "ERROR";
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.querySelector("#clearAll");
const addDecimal = document.querySelector("#decimal");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldClearDisplay = false;
display.textContent = "0";

clearButton.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = "";
  operator = "";
  secondNumber = "";
  shouldClearDisplay = false;
});

addDecimal.addEventListener("click", () => {
  if (display.textContent.includes(".")) {
    return;
  }

  if (!shouldClearDisplay) {
    if (display.textContent === "0" || display.textContent === "") {
      display.textContent = "0.";
    } else {
      display.textContent += ".";
    }
  }

  if (operator === "") {
    firstNumber += ".";
  } else {
    secondNumber += ".";
  }
});

function formatResult(result) {
  if (typeof result !== "number") {
    return result;
  }

  return String(result).length > 15 ? Number(result.toFixed(13)) : result;
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;
    if (display.textContent.length >= 15) return;

    if (/^\d$/.test(buttonText)) {
      if (shouldClearDisplay === true) {
        display.textContent = buttonText;
        shouldClearDisplay = false;
      } else {
        if (display.textContent === "0") {
          if (buttonText !== 0) {
            display.textContent = buttonText;
          }
        } else {
          display.textContent += buttonText;
        }
      }

      if (operator === "") {
        firstNumber += buttonText;
      } else {
        secondNumber += buttonText;
      }
    } else if (/\+|\-|\*|\//.test(buttonText)) {
      if (operator !== "" && display.textContent !== "") {
        const currentSecondNumber = Number(display.textContent);
        let intermediateResult = operate(
          operator,
          firstNumber,
          currentSecondNumber
        );

        if (typeof intermediateResult === "string") {
          display.textContent = intermediateResult;
          firstNumber = "";
          secondNumber = "";
          operator = "";
          shouldClearDisplay = true;
          return;
        }

        if (typeof intermediateResult === "number") {
          intermediateResult = formatResult(intermediateResult);
        }
        firstNumber = intermediateResult;
        display.textContent = intermediateResult;
        secondNumber = "";
      }

      operator = buttonText;
      shouldClearDisplay = true;
      secondNumber = "";
    } else if (buttonText === "=") {
      secondNumber = display.textContent;

      let result = operate(operator, firstNumber, Number(secondNumber));
      if (typeof result === "string") {
        display.textContent = result;
        firstNumber = "";
        operator = "";
        secondNumber = "";
        shouldClearDisplay = true;
        return;
      }
      if (typeof result === "number") {
        shouldClearDisplay = true;
        result = formatResult(result);
      }
      display.textContent = String(result);
      firstNumber = result;
      operator = "";
      secondNumber = "";
    }
  });
});
