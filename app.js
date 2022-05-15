const result = document.querySelector("#result");
const copyBtn = document.querySelector("#clipboard");
const passLength = document.querySelector("#length");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const generateBtn = document.querySelector("#generate");
const copyIcon = document.querySelector("#clipboard i");

function random(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

function upperCase() {
  return String.fromCharCode(random(65, 90));
}

function lowerCase() {
  return String.fromCharCode(random(97, 122));
}

function number() {
  return String.fromCharCode(random(48, 58));
}

function symbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

generateBtn.addEventListener("click", function () {
  let password = [];
  let passLengthVal = passLength.value;
  Number(passLengthVal) > 20 ? (passLengthVal = "20") : passLengthVal;
  const upperCaseVal = uppercase.checked;
  const lowerCaseVal = lowercase.checked;
  const numbersVal = numbers.checked;
  const symbolsVal = symbols.checked;
  let arr = [];

  upperCaseVal ? arr.push(upperCase) : arr;
  lowerCaseVal ? arr.push(lowerCase) : arr;
  numbersVal ? arr.push(number) : arr;
  symbolsVal ? arr.push(symbol) : arr;

  for (let i = 0; i < passLengthVal - arr.length; i++) {
    password.push(arr[Math.floor(Math.random() * arr.length)]());
  }

  function spliceFunc(checked, func) {
    if (checked) {
      return password.splice(
        Math.floor(Math.random() * password.length) - 1,
        0,
        func()
      );
    }
    return "";
  }
  spliceFunc(upperCaseVal, upperCase);
  spliceFunc(lowerCaseVal, lowerCase);
  spliceFunc(numbersVal, number);
  spliceFunc(symbolsVal, symbol);

  result.innerText = password.join("").slice(passLengthVal * -1);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(result.innerText);
  copyIcon.className = "fas fa-check";
  setTimeout(() => {
    copyIcon.className = "far fa-clipboard";
  }, 500);
});
