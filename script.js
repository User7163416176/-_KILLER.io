document.addEventListener('DOMContentLoaded', function() {
    showMainMenu();
});

function showMainMenu() {
    hideAllMenus();
    document.getElementById('main-menu').style.display = 'block';
}

function showCalculator() {
    hideAllMenus();
    document.getElementById('calculator').style.display = 'block';
}

function showBaseConverter() {
    hideAllMenus();
    document.getElementById('base-converter').style.display = 'block';
}

function showSumChecker() {
    hideAllMenus();
    document.getElementById('sum-checker').style.display = 'block';
}

function showOctalComplementCalculator() {
    hideAllMenus();
    document.getElementById('octal-complement-calculator').style.display = 'block';
}

function showArithmeticCalculator() {
    hideAllMenus();
    document.getElementById('arithmetic-calculator').style.display = 'block';
}

function showOverflowChecker() {
    hideAllMenus();
    document.getElementById('overflow-checker').style.display = 'block';
}

function showCarryChecker() {
    hideAllMenus();
    document.getElementById('carry-checker').style.display = 'block';
}

function hideAllMenus() {
    const menus = document.querySelectorAll('.menu');
    menus.forEach(menu => menu.style.display = 'none');
}

function convertBinaryToTwosComplement() {
    const binaryStr = document.getElementById('binary-input').value;
    if (binaryStr.length !== 16 || !/^[01]+$/.test(binaryStr)) {
        alert("Входная строка должна быть двоичным числом из 16 символов.");
        return;
    }
    const invertedBits = binaryStr.split('').map(bit => bit === '0' ? '1' : '0').join('');
    const invertedInt = parseInt(invertedBits, 2);
    const twosComplementInt = invertedInt + 1;
    const twosComplementStr = twosComplementInt.toString(2).padStart(16, '0');
    document.getElementById('binary-result').innerText = `Двоично-дополнительный код: ${twosComplementStr}`;
}

function convertBase() {
    const number = document.getElementById('number-input').value;
    const fromBase = parseInt(document.getElementById('from-base').value);
    const toBase = parseInt(document.getElementById('to-base').value);
    try {
        const decimal = parseInt(number, fromBase);
        const result = decimal.toString(toBase).toUpperCase();
        document.getElementById('conversion-result').innerText = `Результат: ${result}`;
    } catch (error) {
        alert("Некорректное число для системы счисления " + fromBase + ".");
    }
}

function checkSum() {
    const binary1 = document.getElementById('binary1-input').value;
    const binary2 = document.getElementById('binary2-input').value;
    const isSigned = document.getElementById('signed-input').checked;

    if (binary1.length !== 16 || binary2.length !== 16 || !/^[01]+$/.test(binary1 + binary2)) {
        alert("Входные строки должны быть двоичными числами из 16 символов.");
        return;
    }

    let num1 = parseInt(binary1, 2);
    let num2 = parseInt(binary2, 2);

    if (isSigned) {
        num1 = (binary1[0] === '0') ? num1 : num1 - (1 << 16);
        num2 = (binary2[0] === '0') ? num2 : num2 - (1 << 16);
    }

    let result = num1 + num2;
    let overflow = false;

    if (isSigned) {
        overflow = result < -(1 << 15) || result >= (1 << 15);
        result = (result + (1 << 16)) % (1 << 16);
    } else {
        overflow = result >= (1 << 16);
        result %= (1 << 16);
    }

    const resultBinary = result.toString(2).padStart(16, '0');
    document.getElementById('sum-result').innerText = overflow ? "Результат: Неправильный (переполнение)" : `Результат: ${resultBinary}`;
}

function convertOctalToTwosComplement() {
    const octalStr = document.getElementById('octal-input').value;
    try {
        const decimal = parseInt(octalStr, 8);
        const binaryStr = decimal.toString(2).padStart(16, '0');
        const invertedBits = binaryStr.split('').map(bit => bit === '0' ? '1' : '0').join('');
        const invertedInt = parseInt(invertedBits, 2);
        const twosComplementInt = invertedInt + 1;
        const twosComplementBinary = twosComplementInt.toString(2).padStart(16, '0');
        const result = parseInt(twosComplementBinary, 2).toString(8).padStart(6, '0');
        document.getElementById('octal-result').innerText = `Результат: ${result}`;
    } catch (error) {
        alert("Входная строка должна быть восьмеричным числом.");
    }
}

function performArithmeticOperation() {
    const num1Str = document.getElementById('num1-input').value;
    const num2Str = document.getElementById('num2-input').value;
    const fromBase1 = parseInt(document.getElementById('from-base1').value);
    const fromBase2 = parseInt(document.getElementById('from-base2').value);
    const toBase = parseInt(document.getElementById('to-base-result').value);
    const operation = document.getElementById('operation').value;

    try {
        const num1 = parseInt(num1Str, fromBase1);
        const num2 = parseInt(num2Str, fromBase2);
        let result;

        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    alert("Деление на ноль невозможно.");
                    return;
                }
                result = Math.floor(num1 / num2);
                break;
        }

        result = result % (1 << 16);
        const resultInToBase = result.toString(toBase).padStart(16, '0').toUpperCase();
        document.getElementById('arithmetic-result').innerText = `Результат: ${resultInToBase}`;
    } catch (error) {
        alert("Некорректный ввод числа.");
    }
}

function checkOverflow() {
    const binary1 = document.getElementById('overflow-bin1-input').value;
    const binary2 = document.getElementById('overflow-bin2-input').value;

    if (binary1.length !== 16 || binary2.length !== 16 || !/^[01]+$/.test(binary1 + binary2)) {
        alert("Входные строки должны быть двоичными числами из 16 символов.");
        return;
    }

    const num1 = parseInt(binary1, 2);
    const num2 = parseInt(binary2, 2);
    const result = num1 + num2;
    const overflow = ((num1 ^ num2) & 0x8000) === 0 && ((num1 ^ result) & 0x8000) !== 0;

    document.getElementById('overflow-result').innerText = overflow ? "Результат: Есть" : "Результат: Нет";
}

function checkCarry() {
    const binary1 = document.getElementById('carry-bin1-input').value;
    const binary2 = document.getElementById('carry-bin2-input').value;
    const mode = document.getElementById('carry-mode').value;

    if (binary1.length !== 16 || binary2.length !== 16 || !/^[01]+$/.test(binary1 + binary2)) {
        alert("Входные строки должны быть двоичными числами из 16 символов.");
        return;
    }

    const num1 = parseInt(binary1, 2);
    const num2 = parseInt(binary2, 2);

    let carry;
    if (mode === "in") {
        carry = ((num1 + num2) & 0x10000) !== 0;
    } else {
        carry = ((num1 & 0x4000) !== 0) && ((num2 & 0x4000) !== 0);
    }

    document.getElementById('carry-result').innerText = carry ? "Результат: есть" : "Результат: нет";
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText.replace("Двоично-дополнительный код: ", "").replace("Результат: ", "");
    navigator.clipboard.writeText(text).then(() => {
        alert("Результат скопирован в буфер обмена");
    }).catch(err => {
        alert("Ошибка при копировании в буфер обмена");
    });
}
