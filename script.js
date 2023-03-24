const display = document.querySelector(".calculator-input");

const keys = document.querySelector(".calculator-keys");

let displayValue = "0";

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
  /* girilen değerler bize burdan geliyor*/
  /* hesap mekanisinde 0 yazdırmak için atamalar yaptık*/
}
keys.addEventListener("click", function (e) {
  const element = e.target;

  if (!element.matches("button"))
    return; /* matches sayesinde buton olup olmadığını kontrol ediyoruz. button değilse geri kalanı çalışmıyor*/

  if (element.classList.contains("operator")) {
    //console.log("operator", element.value);
    handleOperator(element.value);
    updateDisplay();

    return;
    /* burada ise operatorse consola operator yazdırdık toplama çıkarma işaretlerimize html kısmında operator dedik*/
  }
  if (element.classList.contains("decimal")) {
    //console.log("decimal", element.value);
    inputDecimal();
    updateDisplay();
    return;
    /* nokta tusuna basıldıgını consola yazdırdık*/
  }
  if (element.classList.contains("clear")) {
    //console.log("clear", element.value);
    clear();
    updateDisplay();
    return;
    /* yukarıda yaptıgımız işlemlerin aynısın yaptık clear tusuna tıklandıgını consola yazdırdık*/
  }

  // console.log("number", element.value);
  inputNumber(element.value);
  updateDisplay(); /* yazılan sayıları bunun sayesinde cagırıyoruz*/
});

function handleOperator(nextOperator) {
  /* ilk değerimizi girdikten sonra artı butonuna bastık. gireceğimiz ikinjci değeri almak için birinci degeri firstValue'e aktarıyoruz. */
  const value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }
  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(
      result.toFixed(7)
    )} `; /* en fazla 7 karakterlik bir sonuc çıkmasını sağladık */
    firstValue = result; 
  }

  waitingForSecondValue = true;
  operator = nextOperator;

  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}
/* mar işlemlerinin oldugu yer */
function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}

/* aldıgımız sayıları display value atadık cunku displayValue bizim ilk basta yazdıgımız 0 degeri sayıları onun sayesinde görüyoruz */
function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
  /* nokta işaretini koymamızı sağlıyor */
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  /*inculudes oprotoru sayesinde ' ' parantez içine tırnak içine daha once girilmiş string degerini aratıyoruz eger nokta daha once konulmusa bir daha konulmasın diyoruz */
}

function clear() {
  displayValue = "0";
}
