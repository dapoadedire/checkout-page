// Selecting DOM elements
const form = document.querySelector("form");
const cardInputs = document.querySelectorAll(".card-number-input");
const cardTypeElement = document.querySelector(".card-type");
const cardHolderInput = document.getElementById("card-holder");
const cardHolderDisplay = document.querySelector(".card-holder-display");
const expirationMonthSelect = document.getElementById("month");
const expirationYearSelect = document.getElementById("year");
const expirationDateDisplay = document.querySelector(
  ".expiration-date-display"
);
const submitButton = document.querySelector("button[type='submit']");
const submitMessage = document.querySelector(".submit-message");
const cardTypeImage = document.querySelector(".card-type-img");
const cardNumberError = document.querySelector(".card-number-error");
const cardHolderError = document.querySelector(".card-holder-error");
const ccv = document.querySelector(".ccv-input");
const ccvError = document.querySelector(".ccv-error");
const expirationDateError = document.querySelector(".expiration-date-error");

// Function to detect card type
function detectCardType(cardNumber) {
  cardNumber = cardNumber.replace(/\s/g, "");
  if (/^4/.test(cardNumber)) return "visa";
  if (/^5[1-5]/.test(cardNumber)) return "mastercard";
  if (/^3[47]/.test(cardNumber)) return "amex";
  return "unknown";
}

// Event listeners for card number inputs
cardInputs.forEach((input, index) => {
  input.addEventListener("input", function () {
    if (input.value.length >= 4) {
      if (index < cardInputs.length - 1) cardInputs[index + 1].focus();
    } else if (input.value.length === 0 && index > 0) {
      cardInputs[index - 1].focus();
    }
  });

  cardInputs[0].addEventListener("input", function () {
    cardNumberError.style.display = "none";
    const cardType = detectCardType(cardInputs[0].value);
    cardTypeImage.src =
      cardType === "unknown" ? "" : `./assets/${cardType}.svg`;
    if (cardType === "unknown") cardNumberError.style.display = "block";
  });
});

cardHolderInput.addEventListener("input", function () {
  cardHolderDisplay.textContent = cardHolderInput.value;
  const cardHolderWords = cardHolderInput.value.split(" ");
  const isEmptyWord = cardHolderWords.some((word) => word.trim() === "");

  if (cardHolderWords.length >= 2 && !isEmptyWord) {
    cardHolderError.style.display = "none";
    cardHolderInput.style.border = "1px solid hsl(246, 25%, 77%)";
  } else {
    cardHolderError.style.display = "block";
    cardHolderInput.style.border = "1px solid hsl(0, 100%, 69%)";
  }
});

const currentYear = new Date().getFullYear();
for (let year = currentYear; year <= currentYear + 10; year++) {
  const option = document.createElement("option");
  const lastTwoDigits = year.toString().substring(2);
  option.value = lastTwoDigits;
  option.textContent = lastTwoDigits;
  expirationYearSelect.appendChild(option);
}

for (let month = 1; month <= 12; month++) {
  const option = document.createElement("option");
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  option.value = formattedMonth;
  option.textContent = formattedMonth;
  expirationMonthSelect.appendChild(option);
}

function updateExpirationDateDisplay() {
  const month = expirationMonthSelect.value;
  const year = expirationYearSelect.value;
  expirationDateDisplay.textContent = `${month}/${year}`;
}

expirationMonthSelect.addEventListener("change", updateExpirationDateDisplay);
expirationYearSelect.addEventListener("change", updateExpirationDateDisplay);

function restrictInputLength(inputElement) {
  if (inputElement.value.length > inputElement.maxLength) {
    inputElement.value = inputElement.value.slice(0, inputElement.maxLength);
  }
}



function validateForm() {
  let isValid = true;

  const cardHolderValue = cardHolderInput.value;
  const cardHolderWords = cardHolderValue.split(" ");
  const isEmptyWord = cardHolderWords.some((word) => word.trim() === "");

  if (!(cardHolderWords.length >= 2 && !isEmptyWord)) {
    cardHolderError.style.display = "block";
    cardHolderInput.style.border = "1px solid hsl(0, 100%, 69%)";
    isValid = false;
  } else {
    cardHolderError.style.display = "none";
    cardHolderInput.style.border = "1px solid hsl(246, 25%, 77%)";
  }

  cardInputs.forEach((input) => {
    if (input.value.length < 4) {
      isValid = false;
      input.style.border = "1px solid hsl(0, 100%, 69%)";
    } else {
      input.style.border = "1px solid hsl(246, 25%, 77%)";
    }
  });

  if (ccv.value.length < 3) {
    isValid = false;
    ccv.style.border = "1px solid hsl(0, 100%, 69%)";
    ccvError.style.display = "block"; 
  } else {
    ccv.style.border = "1px solid hsl(246, 25%, 77%)";
    ccvError.style.display = "none"; 
  }

  const month = expirationMonthSelect.value;
  const year = expirationYearSelect.value;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const formattedYear = year.length === 2 ? `20${year}` : year;

  if (
    formattedYear < currentYear ||
    (year == currentYear && month < currentMonth)
  ) {
    isValid = false;
    expirationYearSelect.style.border = "1px solid hsl(0, 100%, 69%)";
    expirationMonthSelect.style.border = "1px solid hsl(0, 100%, 69%)";
    expirationDateError.style.display = "block"; 
  } else {
    expirationYearSelect.style.border = "1px solid hsl(246, 25%, 77%)";
    expirationMonthSelect.style.border = "1px solid hsl(246, 25%, 77%)";
    expirationDateError.style.display = "none"; 
  }
  return isValid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    submitMessage.style.display = "flex";
    setTimeout(() => (submitMessage.style.display = "none"), 5000);
  }
});
