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
  return console.log("ERORR");
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

let firstNumber = "";
let operator = "";
let secondNumber = "";

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;
    if (display.textContent.length >= 15) return;

    if (event.target.textContent >= "0" && event.target.textContent <= "9") {
      if (operator === "") {
        firstNumber += buttonText;
      } else {
        secondNumber += buttonText;
      }
      display.textContent =
        (display.textContent === "0" ? "" : display.textContent) + buttonText;
    } else if (/\+|\-|\*|\//.test(buttonText)) {
      firstNumber = Number(display.textContent);
      operator = buttonText;
      display.textContent = "";
      secondNumber = "";
    } else if (buttonText === "=") {
      secondNumber = display.textContent;

      let result = operate(operator, firstNumber, Number(secondNumber));
      if (typeof result === "number") {
        const resultString = String(result);
        if (resultString.length > 15) {
          result = result.toFixed(13);
        }
      }
      display.textContent = String(result);
      operator = "";
      secondNumber = "";
    }
  });
});
