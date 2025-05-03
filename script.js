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

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.target.textContent;
    if (display.textContent.length >= 15) return;
    if (event.target.textContent >= "0" && event.target.textContent <= "9") {
      display.textContent += event.target.textContent;
    }
  });
});
