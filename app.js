const calcButtons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const rawDisplay = document.querySelector('.rawDisplay');
const warning = document.querySelector('.warning')

let displayNumber = "";
let rawDataResult = '';
let rawData = '';
let removeDigits = '';
let oldNotation = '';
let formattedRawDataArray = [];


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

function factorial(a) {
	if (a == 0) return 1;
	let product = 1;
	for (let i = a; i > 0; i--) {
	  product *= i;
	}
	return product;
}

function exponent(a, b) {
	return Math.pow(a, b);
}

function collectData(e) {
    warning.textContent = "";
    let data = "";
    if (e.key === undefined) {
        data = this.id;
    } else {
        data = e.key;
    }
    switch(data) {
        case '0':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false && hasDivision() === false) {
                displayNumber = displayNumber + '0';
            }
            break;
        case '9':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '9';
            }
            break;
        case '8':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '8';
            }
            break;
        case '7':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '7';
            }
            break;
        case '6':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '6';
            }
            break;
        case '5':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '5';
            }
            break;
        case '4':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '4';
            }
            break;
        case '3':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '3';
            }
            break;
        case '2':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '2';
            }
            break;
        case '1':
            resetDisplayNumber();
            if (hasPreviousFactorial() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '1';
            }
            break; 
        case 'period':
            resetDisplayNumber();
            if (displayNumber.length == 0 && hasPreviousFactorial() === false) {
                displayNumber = displayNumber + '0.';
            } else if (hasPreviousFactorial() === false && hasPreviousPeriod() === false && hasExponent() === false && exceedsDisplay() === false) {
                displayNumber = displayNumber + '.';
            }
            break;
        case 'clear':
            let clearConfirm = confirm('Are you sure you want to clear everything?');
            if (clearConfirm) {
                displayNumber = '';
                rawData = '';
            }
            break;
        case 'positive-negative':
            if (exceedsDisplay() === false) {
                switchPositiveNegative();
            }
            break;
        case 'factorial':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false && exceedsDisplay() === false && hasTwoDigitsMax() === true) {
                displayNumber = displayNumber + '!';
                addDisplayToRaw();
                displayNumber = '';
            }
            break;
        case 'exponent':
            if (hasPreviousNumber() === true && hasPreviousPeriod() === false && exceedsDisplay() === false) {
                clearRawDataResult();
                displayNumber = displayNumber + '^';
            }
            break;
        case 'Backspace':
            resetDisplayNumber();
            backspaceNumberOrOperator()
            break;
        case 'plus':
            if (hasPreviousOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' + ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '+'`
            }
            break;
        case 'minus':
            if (hasPreviousOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' - ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '-'`
            }
            break;
        case 'times':
            if (hasPreviousOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' * ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '*'`
            }
            break;
        case 'divide':
            if (hasPreviousOperator() === false) {
                addDisplayToRaw();
                rawData = rawData + ' / ';
                displayNumber = '';
            } else {
                warning.textContent = `You must have a number before choosing '/'`
            }
            break;
        case 'equals':
            addDisplayToRaw();
            if (validEquation() === true) {
                copyRawDataToCalculate();
                displayNumber = rawDataResult;
            } else {
                warning.textContent = `You must have a valid equation to solve. It can not end with '+ - * /'`
            }
            break;
    }
    display.textContent = displayNumber;
    displayRawData();
}

function resetDisplayNumber() {
    if (rawDataResult != 0) {
        displayNumber = '';
        rawDataResult = '';
    }
}

function exceedsDisplay() {
    if (displayNumber.length >= 12 || rawData.length >= 45) {
        warning.textContent = `The numbers have reached the limit of the display.`
        return true;
    } else {
        return false;
    }
}

function hasPreviousOperator() {
    if (displayNumber.length != 0 || (rawData.charAt(rawData.length - 1).match(/[\d!\.]/))) {
        return false;
    } else {
        return true;
    }
}

function hasPreviousFactorial() {
    if (rawData.charAt(rawData.length - 1).match(/!/)) {
        warning.textContent = `Please enter a math operator after using a factorial.`;
        return true;
    } else {
        return false;
    }
}

function hasTwoDigitsMax() {
    if (displayNumber.length <= 2) {
        return true;
    } else {
        warning.textContent = `The max for a factorial is 2 digits on this calculator.`;
        return false;
    }
}

function hasDivision() {
    if (rawData.charAt(rawData.length - 2).match(/\//) && displayNumber.length == 0) {
        warning.textContent = `This calculator will not divide by 0. I'm sure in your infinite wisdom you already know the answer to ${rawData} 0.`;
        return true;
    } else {
        return false;
    }
}

function hasPreviousPeriod() {
    if (displayNumber.match(/\./)) {
        warning.textContent = `You can not have a decimal point in a exponent, factorial, or if there is already a decimal point.`;
        return true;
    } else {
        return false;
    }
}

function hasExponent() {
    if (displayNumber.match(/\^/)) {
        warning.textContent = `You can not use a decimal point in an exponent on this calculator`;
        return true;
    } else {
        return false;
    }
}

function hasPreviousNumber() {
    if (displayNumber.charAt(displayNumber.length - 1).match(/\d/)) {
        return true;
    } else {
        warning.textContent = `You must enter a number before using a factorial or exponent`;
        return false;
    }
}

function backspaceNumberOrOperator() {
    if (displayNumber.length >= 1) {
        let displayArray = displayNumber.split('');
        displayArray.pop();
        let displayString = displayArray.join('');
        displayNumber = displayString;
    } else {
        let rawDataArray = rawData.split('');
        if (rawDataArray.length >= 1 && rawDataArray[rawDataArray.length-1].match(/\s/)) {
            rawDataArray.pop();
            rawDataArray.pop();
            rawDataArray.pop();
        } else {
            rawDataArray.pop();
        }
        let rawDataString = rawDataArray.join('');
        rawData = rawDataString;
    }
}

function switchPositiveNegative() {
    if (displayNumber.length == 0) {
        displayNumber = '-';
    } else {
        let displayArray = displayNumber.split('');
        if (displayArray[0].match(/-/)) {
            displayArray.shift();
            let displayString = displayArray.join('');
            displayNumber = displayString;
        } else {
            displayArray.unshift('-');
            let displayString = displayArray.join('');
            displayNumber = displayString;
        }
    }
}

function addDisplayToRaw() {
    if (rawDataResult.length == 0) {
        rawData = rawData + displayNumber;
    } else {
        rawData = displayNumber;
        rawDataResult = '';
    }
}

function clearRawDataResult() {
    if (rawDataResult.length != 0) {
        rawDataResult = '';
    }
}

function validEquation() {
    if (rawData.charAt(rawData.length - 1).match(/!|\d/)) {
        return true;
    } else {
        return false;
    }
}

function copyRawDataToCalculate() {
    let rawDataArray = rawData.split(' ');
    rawDataResult = rawDataArray.join(' ');
    calculateData();
}

function calculateData() {   
    if (rawDataResult.match(/\d+!/)) {
        solveFactorial();
    } else if (rawDataResult.match(/\d+\^\d+/)) {
        solveExponent();
    } else if (rawDataResult.match(/\*|\//)) {
        solveMultiplicationOrDivison();
    } else if ((rawDataResult.match(/[\s][\+|-][\s]/))) {
        solveAdditionOrSubtraction();
    } else {
        if (rawDataResult.length > 12) {
            formatRawDataResults();
            return rawDataResult;
        } else {
            return rawDataResult;
        }
    }
}

function solveFactorial() {
    let factorialMatch = rawDataResult.match(/\d+!/)[0];
    let factorialArray = factorialMatch.split('');
    factorialArray.pop();
    factorialNumber = factorialArray.join('');
    let factorialResult = factorial(factorialNumber);
    let factoralRawData = /\d+!/[Symbol.replace](rawDataResult, factorialResult);
    rawDataResult = factoralRawData;
    calculateData();
}

function solveMultiplicationOrDivison() {
    let multiplicationDivisionRegExp = /(\-?)[\d]+(\.?)[\d]*[\s][\*|\/][\s](\-?)[\d]+(\.?)[\d]*/;
    let multiplicationDivisionMatch = rawDataResult.match(multiplicationDivisionRegExp)[0];
    let isMultiplicationOrDivision = multiplicationDivisionMatch.match(/\*|\//)[0];
    let numberRegExp = /(\-?)[\d]+(\.?)[\d]*/g;
    let firstNumber = multiplicationDivisionMatch.match(numberRegExp)[0];
    let secondNumber = multiplicationDivisionMatch.match(numberRegExp)[1];
    if (isMultiplicationOrDivision == '*') {
        let multiplicationResult = multiply(firstNumber, secondNumber);
        let multiplicationRawData = multiplicationDivisionRegExp[Symbol.replace](rawDataResult, multiplicationResult);
        rawDataResult = multiplicationRawData;
    } else {
        let divisionResult = divide(firstNumber, secondNumber);
        let divisionRawData = multiplicationDivisionRegExp[Symbol.replace](rawDataResult, divisionResult);
        rawDataResult = divisionRawData;
    }
    calculateData();
}

function solveAdditionOrSubtraction() {
    const additionSubtractionRegExp = /(\-?)[\d]+(\.?)[\d]*[\s][\+|-][\s](\-?)[\d]+(\.?)[\d]*/;
    let additionSubtractionMatch = rawDataResult.match(additionSubtractionRegExp)[0];
    let isAdditionOrSubtraction = additionSubtractionMatch.match(/[\s][\+|-][\s]/)[0];
    let numberRegExp = /(\-?)[\d]+(\.?)[\d]*/g;
    let firstNumber = Number(additionSubtractionMatch.match(numberRegExp)[0]);
    let secondNumber = Number(additionSubtractionMatch.match(numberRegExp)[1]);
    if (isAdditionOrSubtraction == ' + ') {
        let additionResult = add(firstNumber, secondNumber);
        let additionRawData = additionSubtractionRegExp[Symbol.replace](rawDataResult, additionResult);
        rawDataResult = additionRawData;
    } else {
        let subtractionResult = subtract(firstNumber, secondNumber);
        let subtractionsRawData = additionSubtractionRegExp[Symbol.replace](rawDataResult, subtractionResult);
        rawDataResult = subtractionsRawData;
    }
    calculateData()
}

function displayRawData() {
    if (rawDataResult.length == 0) {
        rawDisplay.textContent = rawData;
    } else {
        rawDisplay.textContent = rawData;
        rawData = '';
    }
}

function formatRawDataResults() {
    removeDigits = (rawDataResult.length - 10);
    formattedRawDataArray = rawDataResult.split('');
    let notationRegExp = /e\+*\d+/;
    let decimalRegExp = /\./;
    if (rawDataResult.match(notationRegExp)) {
        rawDataMatch = rawDataResult.match(notationRegExp)[0];
        oldNotation = rawDataMatch.length - 1;
        rawDataResult = /e\+*/[Symbol.replace](rawDataResult, 0);
        addNotation(oldNotation);
    } else if (rawDataResult < 1000000000 && rawDataResult.match(decimalRegExp)) {
        for (i = 1; i <= removeDigits - 2; i++) {
            formattedRawDataArray.pop();
        }
        let formattedRawData = formattedRawDataArray.join('');
        rawDataResult = formattedRawData;
    
    } else  {
        addNotation(0);
    }
    warning.textContent = `The result has been formatted to fit in the display area`;
}

function addNotation(oldNotation) {
    if ((removeDigits + oldNotation) >= 10) {
        for (i = 0; i <= removeDigits; i++) {
            formattedRawDataArray.pop();
        }
    } else {
        for (i = 1; i <= removeDigits; i++) {
            formattedRawDataArray.pop();
        }
    }
    let formattedRawData = formattedRawDataArray.join('') + `e${removeDigits + oldNotation}`;
    rawDataResult = formattedRawData;
}

calcButtons.forEach(calcButton => calcButton.addEventListener('click', collectData))