const cardInputs = document.querySelectorAll(".card-number-input");
const cardTypeElement = document.querySelector(".card-type");
const cardHolderInput = document.getElementById("card-holder");
const cardHolderDisplay = document.querySelector(".card-holder-display");
const expirationMonthSelect = document.getElementById("month");
const expirationYearSelect = document.getElementById("year");
const expirationDateDisplay = document.querySelector(".expiration-date-display");
const submitButton = document.querySelector("button[type='submit']");
const submitMessage = document.querySelector(".submit-message");
const cardTypeImage = document.querySelector(".card-type-img");
const cardNumberError = document.querySelector(".card-number-error");
const cardHolderError = document.querySelector(".card-holder-error");
const cvv = document.querySelector(".cvv-input");

function detectCardType(cardNumber) {
  cardNumber = cardNumber.replace(/\s/g, ''); // Remove spaces and non-numeric characters
  if (/^4/.test(cardNumber)) {
    return "visa";
  } else if (/^5[1-5]/.test(cardNumber)) {
    return "mastercard";
  } else if (/^3[47]/.test(cardNumber)) {
    return "amex";
  } else {
    return "unknown";
  }
}

cardInputs.forEach((input, index) => {
  input.addEventListener("input", function () {
    if (input.value.length >= 4) {
      if (index < cardInputs.length - 1) {
        cardInputs[index + 1].focus();
      }
    } else if (input.value.length === 0) {
      if (index > 0) {
        cardInputs[index - 1].focus();
      }
    }
  });

  cardInputs[0].addEventListener("input", function () {
    cardNumberError.style.display = "none";
    const cardType = detectCardType(cardInputs[0].value);
    if (cardType === "unknown") {
      cardTypeImage.src = "";
      cardNumberError.style.display = "block";
    }
    cardTypeImage.src = `./assets/${cardType}.svg`;
  });
});

cardHolderInput.addEventListener("input", function () {
  cardHolderDisplay.textContent = cardHolderInput.value;

  const cardHolderValue = cardHolderInput.value;
  const cardHolderWords = cardHolderValue.split(" ");
  console.log(cardHolderWords);

  // Check if any of the words are empty
  const isEmptyWord = cardHolderWords.some(word => word.trim() === "");

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

expirationMonthSelect.addEventListener("change", function () {
  const month = expirationMonthSelect.value;
  const year = expirationYearSelect.value;
  expirationDateDisplay.textContent = `${month}/${year}`;
});

expirationYearSelect.addEventListener("change", function () {
  const month = expirationMonthSelect.value;
  const year = expirationYearSelect.value;
  console.log(month, year);
  expirationDateDisplay.textContent = `${month}/${year}`;
});

function restrictInputLength(inputElement) {
  if (inputElement.value.length > inputElement.maxLength) {
    inputElement.value = inputElement.value.slice(0, inputElement.maxLength);
  }
}



// submit button

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  submitMessage.style.display = "flex";
  setTimeout(function () {
    submitMessage.style.display = "none";
  }, 5000);
}
);

// the submit button should only be active when all the fields are filled out correctly









