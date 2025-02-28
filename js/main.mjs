function initializePage() {
    generateFooter();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateFooter() {
    const nineDigitsFlavor = getRandomInt(999) + "-" + getRandomInt(999) + "-" + getRandomInt(999);
    const currYear = new Date().getFullYear();
    const instanceText = "INSTANCE #" + getRandomInt(10000);
    document.querySelector('.footer-flair-label').textContent = currYear + " // " + instanceText + " // " + nineDigitsFlavor;
}

addEventListener("DOMContentLoaded", initializePage);