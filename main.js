// Calculator operations

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function round(numPlaces, num) {
    let roundProduct = 1;
    for(let i = 1; i <= numPlaces; i++) {
        roundProduct *= 10;
    }
    return Math.round((num + Number.EPSILON) * roundProduct) / roundProduct;
}

function operate(operator, a, b) {
    if(typeof a !== "number" || typeof b !== "number") {
        throw new Error("Operand given is not a number.");
    }

    let res = null;
    if(operator === "+") {
        res = add(a, b);
    } else if(operator === "-") {
        res = sub(a, b);
    } else if(operator === "x") {
        res = mul(a, b);
    } else if(operator === "÷") {
        if(b === 0) {
            return "LMAO";
        }
        res = div(a, b);
    } else {
        throw new Error("Operator is not part of calculator.");
    }
    return round(6, res);
}

let operandA;
let operandB;
let operator;
let justCalculated = false;

function initializeConditions() {
    operandA = "0";
    operandB = null;
    operator = null;
}

initializeConditions();

// Calculator layout

const buttonContainer = document.querySelector(".operation_buttons");
const calculatorLayout = [
    [7, 8, 9, "÷"],
    [4, 5, 6, "x"],
    [1, 2, 3, "-"],
    [0, ".", "=", "+"],
    ["Clear", "Backspace"]
]
for(let i = 0; i < calculatorLayout.length; i++) {
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("button_row");
    for(let j = 0; j < calculatorLayout[i].length; j++) {
        const operationButton = document.createElement("button");
        operationButton.classList.add("operation_button");
        operationButton.textContent = calculatorLayout[i][j];
        if(operationButton.textContent.toLowerCase() === "clear") {
            operationButton.id = "clear_button";
        }
        if(operationButton.textContent.toLowerCase() === "backspace") {
            operationButton.id = "backspace_button";
        }
        buttonRow.appendChild(operationButton);
    }
    buttonContainer.appendChild(buttonRow);
}

// Calculator display

let displayVal = "0";
const display = document.querySelector(".display");
display.textContent = displayVal;


// Button functions

function isNumeric(str) {
    return /^[0-9]+$/.test(str);
}

function isOperator(str) {
    return /^[x÷\-+]$/.test(str);
}

function resetDisplay() {
    initializeConditions();
    displayVal = "0";
    display.textContent = displayVal;
}

function updateDisplay(e) {
    // Set operand A
    if((operandA === "0" || justCalculated) && isNumeric(this.textContent) && operator === null && operandB === null) {
        operandA = this.textContent;
        justCalculated = false;
    // Set operand B
    } else if(isNumeric(this.textContent) && ((operandB === "0") || (operator !== null && operandB === null))) {
        operandB = this.textContent;
    // Set operator
    } else if(isOperator(this.textContent) && operator === null && operandA !== null) {
        operator = this.textContent;
    // Add to operand A
    } else if(operator === null && (isNumeric(this.textContent) || (this.textContent === "." && !operandA.includes(".")))) {
        operandA += this.textContent;
    // Add to operand B
    } else if(operandB !== null && (isNumeric(this.textContent) || (this.textContent === "." && !operandB.includes(".")))) {
        operandB += this.textContent;
    } else if(this.textContent.toLowerCase() === "backspace") {
        if(operandB !== null) {
            operandB = operandB.slice(0, operandB.length-1);
            if(operandB === "") {
                operandB = null;
            }
        } else if(operator !== null) {
            operator = operator.slice(0, operator.length-1);
            operator = null;
        } else if(operandA !== null && isNumeric(operandA)) {
            operandA = operandA.slice(0, operandA.length-1);
            if(operandA === "") {
                operandA = "0";
            }
        }
    }
    // Want our result
    else if((this.textContent === "=" || isOperator(this.textContent)) && operator !== null && operandB !== null) {
        const res = operate(operator, Number(operandA), Number(operandB));
        initializeConditions();
        operandA = res;
        displayVal = res;
        if(isOperator(this.textContent)){
            operator = this.textContent;
            displayVal += operator;
        }
        display.textContent = displayVal;
        justCalculated = true;
        return;
    } else if(this.textContent.toLowerCase() === "clear") {
        resetDisplay();
        return;
    } else {
        throw new Error("OOPS! Looks like something went wrong.");
    }

    displayVal = operandA;
    if(operator !== null) {
        displayVal += operator;
    }
    if(operandB !== null) {
        displayVal += operandB;
    }

    display.textContent = displayVal;
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('click', updateDisplay));