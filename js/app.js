const ageCalculator = () => {
    let form = document.forms["form"];
    let day = form["day"].value;
    let month = form["month"].value;
    let year = form["year"].value;

    resetInputStyles();
    formValidator(day, month, year);

    if (formValidator(day, month, year) === false) {
        let dateOfBirth = new Date(year, month - 1, day);
        let currentDate = new Date();

        let yearCalculated =
            currentDate.getFullYear() - dateOfBirth.getFullYear();
        let monthCalculated = currentDate.getMonth() - dateOfBirth.getMonth();
        let dayCalculated = currentDate.getDate() - dateOfBirth.getDate();

        if (dayCalculated < 0) {
            dayCalculated--;
            monthCalculated--;
            currentDate.setMonth(currentDate.getMonth() + 1);
            currentDate.setDate(0);
            let totalDaysMonth = currentDate.getDate();

            dayCalculated = totalDaysMonth - Math.abs(dayCalculated);
        }

        if (monthCalculated < 0) {
            yearCalculated--;
            monthCalculated += 11;
        }

        document.getElementById("years-result").innerHTML = yearCalculated;
        document.getElementById("months-result").innerHTML = monthCalculated;
        document.getElementById("days-result").innerHTML = dayCalculated;

        let spanDOMElements = document.querySelectorAll(
            ".age-calculated-section p span"
        );
        spanDOMElements.forEach((spanElement) => {
            spanElement.style.letterSpacing = "0";
            spanElement.style.marginRight = "0.6rem";
        });
    }
};

const applyErrorStyles = (
    errorMessage,
    inputInfo,
    display,
    color,
    borderColor
) => {
    document.querySelector(`#form-item-${inputInfo} small`).innerHTML =
        errorMessage;
    document.querySelector(`#form-item-${inputInfo} small`).style.display =
        display;
    document.querySelector(`#form-item-${inputInfo} label`).style.color = color;
    document.querySelector(`#form-item-${inputInfo} input`).style.borderColor =
        borderColor;
};

const formValidator = (day, month, year) => {
    let dateDatum = new Date();
    let existsError = false;

    if (day == "" || day <= 0 || day > 31) {
        if (day == "") {
            applyErrorStyles(
                "The field day is required",
                "day",
                "block",
                "var(--light-red)",
                "var(--light-red)"
            );
            existsError = true;
        } else if (day <= 0 || day > 31) {
            applyErrorStyles(
                "Must be a valid day",
                "day",
                "block",
                "var(--light-red)",
                "var(--light-red)"
            );
            existsError = true;
        }
    }

    if (month == "" || month < 1 || month > 12) {
        if (month == "") {
            applyErrorStyles(
                "The field month is required",
                "month",
                "block",
                "var(--light-red)",
                "var(--light-red)"
            );
            existsError = true;
        } else if (month < 1 || month > 12) {
            applyErrorStyles(
                "Must be a valid month",
                "month",
                "block",
                "var(--light-red)",
                "var(--light-red)"
            );
            existsError = true;
        }
    }

    if (year == "" || year < 1 || year > dateDatum.getFullYear()) {
        if (year == "") {
            applyErrorStyles(
                "This field year is required",
                "year",
                "block",
                "var(--light-red)",
                "var(--light-red)"
            );
            existsError = true;
        } else if (year > dateDatum.getFullYear()) {
            console.log("ON");
            applyErrorStyles(
                "Must be a valid year",
                "year",
                "block",
                "var(--light-red)",
                "var(--light-red)"
            );
            existsError = true;
        }
    }
    return existsError;
};

const resetInputStyles = () => {
    applyErrorStyles("", "day", "none", "", "");
    applyErrorStyles("", "month", "none", "", "");
    applyErrorStyles("", "year", "none", "", "");
};

document
    .getElementById("arrow-button")
    .addEventListener("click", ageCalculator);