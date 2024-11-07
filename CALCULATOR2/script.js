// script.js

let display = document.getElementById("display");
let buttons = Array.from(document.getElementsByClassName("btn"));
let currentInput = "";
let operator = "";
let prevInput = "";
let result = 0;

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Event listener for button clicks
buttons.forEach(button => {
    button.addEventListener("click", function() {
        let value = button.getAttribute("data-value");

        // Handle number and decimal input
        if (!isNaN(value) || value === '.') {
            currentInput += value;
            updateDisplay(currentInput);
        }

        // Handle clear button
        if (value === 'C') {
            currentInput = '';
            prevInput = '';
            operator = '';
            result = 0;
            updateDisplay('0');
        }

        // Handle operators (+, -, *, /)
        if (["+", "-", "*", "/"].includes(value)) {
            if (prevInput !== '') {
                // Calculate previous result if any
                calculate();
            }
            operator = value;
            prevInput = currentInput;
            currentInput = '';
        }

        // Handle equal button
        if (value === "=") {
            calculate();
            updateDisplay(result);
            currentInput = result.toString();
            prevInput = '';
            operator = '';
        }
    });
});

// Function to perform calculation
function calculate() {
    if (operator === '+') {
        result = parseFloat(prevInput) + parseFloat(currentInput);
    } else if (operator === '-') {
        result = parseFloat(prevInput) - parseFloat(currentInput);
    } else if (operator === '*') {
        result = parseFloat(prevInput) * parseFloat(currentInput);
    } else if (operator === '/') {
        if (currentInput !== '0') {
            result = parseFloat(prevInput) / parseFloat(currentInput);
        } else {
            result = "Error";
        }
    }
    currentInput = result.toString();
    prevInput = '';
}
