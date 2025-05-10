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
  if (!["+", "-", "*", "/"].includes(operator)) {
    console.error("Неверный оператор: ", operator);
    return;
  }
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
const clearButton = document.querySelector("#clear-all");
const addDecimal = document.querySelector("#decimal");
const toggleSign = document.querySelector("#sign-toggle");
const handleBackspace = document.querySelector("#backspace-btn");
const percentageButton = document.querySelector("#percentage-btn");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldClearDisplay = false;
display.textContent = "0";
let activeOperatorButton = null;

percentageButton.addEventListener("click", () => {
  let currentValue = parseFloat(display.textContent);
  let base = operator === "" ? currentValue : firstNumber;
  let percentOf = parseFloat(base);

  if (isNaN(currentValue) || !isFinite(currentValue) || currentValue === 0)
    return;

  if (isNaN(percentOf) || !isFinite(percentOf)) return;

  let percentageValue = (percentOf * currentValue) / 100;

  display.textContent = percentageValue;

  if (operator === "") {
    firstNumber = percentageValue;
  } else {
    secondNumber = percentageValue;
  }
});

handleBackspace.addEventListener("click", () => {
  if (display.textContent === "0" || display.textContent === "") return;

  let updateText = display.textContent.slice(0, -1);

  if (updateText === "" || updateText === "-") updateText = "0";

  display.textContent = updateText;

  if (operator === "") {
    firstNumber = updateText;
  } else {
    secondNumber = updateText;
  }
});

toggleSign.addEventListener("click", () => {
  let currentValue = parseFloat(display.textContent);

  if (isNaN(currentValue) || currentValue === 0) {
    return;
  }
  currentValue = -currentValue;
  display.textContent = currentValue;

  if (operator === "") {
    firstNumber = currentValue;
  } else {
    secondNumber = currentValue;
  }
});

clearButton.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = "";
  operator = "";
  secondNumber = "";
  shouldClearDisplay = false;
  clearHighlight();
});

addDecimal.addEventListener("click", () => {
  if (shouldClearDisplay) {
    display.textContent = "0.";
    shouldClearDisplay = false;

    if (operator === "") {
      firstNumber = "0.";
    } else {
      secondNumber = "0.";
    }
    clearHighlight();
    return;
  }

  if (display.textContent.includes(".")) return;

  display.textContent += ".";

  if (operator === "") {
    firstNumber = "0.";
  } else {
    secondNumber = "0.";
  }
  clearHighlight();
});

function formatResult(result) {
  if (typeof result !== "number") return result;

  let rounded = parseFloat(result.toFixed(10));

  let resultStr = rounded.toString();

  if (resultStr.length > 15) {
    resultStr = rounded.toExponential(8);
  }

  return resultStr;
}

function highlightButton(button) {
  if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active-operator");
  }
  button.classList.add("active-operator");
  activeOperatorButton = button;
}

function clearHighlight() {
  if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active-operator");
    activeOperatorButton = null;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clickedButton = event.target;
    clickedButton.classList.add("flash");

    setTimeout(() => {
      clickedButton.classList.remove("flash");
    }, 150);
    const buttonText = event.target.textContent;
    if (buttonText === "+/-") return;
    if (display.textContent.length >= 14) return;

    if (/^\d$/.test(buttonText)) {
      clearHighlight();
      if (shouldClearDisplay === true) {
        display.textContent = buttonText;
        shouldClearDisplay = false;
      } else {
        if (display.textContent === "0") {
          if (buttonText !== "0") {
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
      const currentOperator = buttonText;

      highlightButton(event.currentTarget);

      if (operator !== "" && secondNumber === "") {
        operator = currentOperator;
      } else if (operator !== "" && display.textContent === "") {
        operator = currentOperator;
      } else if (operator === "" && display.textContent !== "") {
        firstNumber = Number(display.textContent);
        operator = currentOperator;
        shouldClearDisplay = true;
        secondNumber = "";
      } else if (operator !== "" && display.textContent !== "") {
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

          clearHighlight();
          return;
        }

        if (typeof intermediateResult === "number") {
          intermediateResult = formatResult(intermediateResult);
        }

        firstNumber = intermediateResult;
        display.textContent = intermediateResult;
        operator = currentOperator;
        shouldClearDisplay = true;
        secondNumber = "";
      }
    } else if (buttonText === "=") {
      if (operator === "" || firstNumber === "" || display.textContent === "") {
        return;
      }

      secondNumber = display.textContent;

      let result = operate(operator, firstNumber, Number(secondNumber));
      if (typeof result === "string") {
        display.textContent = result;
        firstNumber = "";
        operator = "";
        secondNumber = "";
        shouldClearDisplay = true;
        clearHighlight();
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
      clearHighlight();
    }
  });
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  console.log(key);

  let targetButtonText = null;
  let targetButtonID = null;

  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      targetButtonText = key;
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      targetButtonText = key;
      break;

    case ".":
      targetButtonText = key;
      break;

    case "=":
    case "Enter":
      targetButtonText = "=";
      break;

    case "Backspace":
      targetButtonID = "backspace-btn";
      break;

    case "Escape":
      targetButtonID = "clear-all";
      break;

    case "p":
      targetButtonID = "percentage-btn";
      break;

    case "t":
      targetButtonID = "sign-toggle";
      break;

    default:
      return;
  }

  let targetButtonElement = null;

  if (targetButtonText) {
    targetButtonElement = [...document.querySelectorAll("button")].find(
      (btn) => btn.textContent === targetButtonText
    );
  } else if (targetButtonID) {
    targetButtonElement = document.getElementById(targetButtonID);
  }

  if (targetButtonElement) {
    targetButtonElement.classList.add("active-operator");
    setTimeout(
      () => targetButtonElement.classList.remove("active-operator"),
      150
    );
    targetButtonElement.click();
  }
});
