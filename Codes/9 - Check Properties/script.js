let button = document.getElementById("myButton"),
    checkBox = document.getElementById("myCheckBox");

const visa = document.getElementById("visaBtn"),
      mastercard = document.getElementById("masterBtn"),
      amex = document.getElementById("amexBtn");

button.onclick = function() {
    if (checkBox.checked) {
        console.log("Checked");
    } else {
        console.log("Not checked");
    }

    if (visa.checked) {
        console.log("Visa");
    } else if (mastercard.checked) {
        console.log("Mastercard");
    } else if (amex.checked) {
        console.log("Amex");
    } else {
        console.log("No card selected");
    }
}