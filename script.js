


document.addEventListener("DOMContentLoaded", function() {
    const cardInputs = document.querySelectorAll(".card-number-input");

    cardInputs.forEach((input, index) => {
        input.addEventListener("input", function() {
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
    });
});
