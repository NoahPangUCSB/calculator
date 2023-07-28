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

function operate(operator, a, b) {
    if(typeof a !== "number" || typeof b !== "number") {
        throw new Error("Operand given is not a number.");
    }

    if(operator === "+") {
        return add(a, b);
    } else if(operater === "-") {
        return sub(a, b);
    } else if(operator === "*") {
        return mul(a, b);
    } else if(operator === "/") {
        return div(a, b);
    } else {
        throw new Error("Operator is not part of calculator.");
    }
}

let operandA;
let operandB;
let operator;

// Calculator display

const numberContainer = document.querySelector(".numbers");
