// how does a calculator work?
// it has a running total
//it adds, subtracts, multiplies, divides numbers
//keeps track of operators

let runningTotal = 0;
let buffer = "0"; // this string is whats displayed while waiting for user input.
let previousOperator = null; // to keep track of the last operator pressed since the calculator needs to keep track of this.
const screen = document.querySelector(".screen");
// first we will bind an event listener
document
  .querySelector(".button-container")
  .addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch (
    value // in place of if else statements, switch statements are used in its place. it switches codeblocks based on value.
  ) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;

      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer)); //turns buffer into a number for flushOperation
      previousOperator = null;
      buffer = "" + runningTotal; //keeping buffer the same type because its not good to switch types...and buffer has always been a string.
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1); //substring returns between start and end values.
      }

      break;
    default:
      //default case for handling math
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer; // we save intBuffer in running total so when we press an operator key we can call this value
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "x") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}
